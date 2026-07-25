import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("finished site replaces the starter preview", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  const packageJson = await readFile(new URL("package.json", root), "utf8");

  assert.match(page, /JS Cleaners/);
  assert.match(page, /Dry cleaning/);
  assert.match(page, /google\.com\/maps\/dir/);
  assert.doesNotMatch(page, /handleRequest|Prepare my text|sms:/);
  assert.doesNotMatch(page, /Private page|password-protected|Private schedule/);
  assert.doesNotMatch(page, /—|&mdash;|&#8212;/);
  assert.match(layout, /og-v2\.png/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("deployment assets are present", async () => {
  await access(new URL("public/garments-ready.webp", root));
  await access(new URL("public/pressing-care.webp", root));
  await access(new URL("public/og-v2.png", root));
  await access(new URL(".openai/hosting.json", root));
});

test("hours are public and served from a dynamic route", async () => {
  const home = await readFile(new URL("app/page.tsx", root), "utf8");
  const hoursPage = await readFile(new URL("app/hours/page.tsx", root), "utf8");
  const worker = await readFile(new URL("worker/index.ts", root), "utf8");

  assert.match(home, /Monday to Friday/);
  assert.match(home, /href="\/hours"/);
  assert.match(hoursPage, /dynamic = "force-dynamic"/);
  assert.doesNotMatch(hoursPage, /index: false|noindex/);
  assert.doesNotMatch(worker, /HOURS_PAGE_PASSWORD|WWW-Authenticate|Authorization required/);
});
