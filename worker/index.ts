/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  HOURS_PAGE_PASSWORD?: string;
  HOURS_PAGE_USERNAME?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function unauthorizedHoursResponse(): Response {
  return new Response(
    "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Authorization required</title></head><body><main><h1>Authorization required</h1><p>Enter the JS Cleaners hours-page username and password to continue.</p></main></body></html>",
    {
      status: 401,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "WWW-Authenticate": 'Basic realm="JS Cleaners Hours", charset="UTF-8"',
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}

function decodeBasicCredentials(header: string | null): {
  username: string;
  password: string;
} | null {
  if (!header?.startsWith("Basic ")) return null;

  try {
    const bytes = Uint8Array.from(atob(header.slice(6)), (character) =>
      character.charCodeAt(0),
    );
    const decoded = new TextDecoder().decode(bytes);
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

async function valuesMatch(left: string, right: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);
  let difference = 0;

  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index];
  }

  return difference === 0;
}

async function isAuthorizedForHours(request: Request, env: Env): Promise<boolean> {
  const configuredPassword =
    env?.HOURS_PAGE_PASSWORD || process.env.HOURS_PAGE_PASSWORD;
  if (!configuredPassword) return false;

  const credentials = decodeBasicCredentials(request.headers.get("Authorization"));
  if (!credentials) return false;

  const expectedUsername =
    env?.HOURS_PAGE_USERNAME || process.env.HOURS_PAGE_USERNAME || "admin";
  const [usernameMatches, passwordMatches] = await Promise.all([
    valuesMatch(credentials.username, expectedUsername),
    valuesMatch(credentials.password, configuredPassword),
  ]);

  return usernameMatches && passwordMatches;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (
      (url.pathname === "/hours" || url.pathname.startsWith("/hours/")) &&
      !(await isAuthorizedForHours(request, env))
    ) {
      return unauthorizedHoursResponse();
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
