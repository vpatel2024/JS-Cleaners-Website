import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("finished site replaces the starter preview", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  const packageJson = await readFile(new URL("package.json", root), "utf8");

  assert.match(page, /JS Cleaners/);
  assert.match(page, /Care you can feel/);
  assert.match(page, /google\.com\/maps\/dir/);
  assert.doesNotMatch(page, /handleRequest|Prepare my text|sms:/);
  assert.doesNotMatch(page, /—|&mdash;|&#8212;/);
  assert.match(layout, /og\.png/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("deployment assets are present", async () => {
  await access(new URL("public/pressed-shirts.webp", root));
  await access(new URL(".openai/hosting.json", root));
});

test("hours are served from a protected dynamic route", async () => {
  const home = await readFile(new URL("app/page.tsx", root), "utf8");
  const hoursPage = await readFile(new URL("app/hours/page.tsx", root), "utf8");
  const worker = await readFile(new URL("worker/index.ts", root), "utf8");

  assert.doesNotMatch(home, /7:00 AM/);
  assert.match(home, /href="\/hours"/);
  assert.match(hoursPage, /dynamic = "force-dynamic"/);
  assert.match(hoursPage, /robots:/);
  assert.match(worker, /HOURS_PAGE_PASSWORD/);
  assert.match(worker, /WWW-Authenticate/);
  assert.doesNotMatch(worker, /HOURS_PAGE_PASSWORD\s*[:=]\s*["'][^"']+/);
});
