#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const ROOT = join(import.meta.dirname, "../../..");
const PKG = join(ROOT, "packages/utils");
const SRC = join(PKG, "src");

const REPLACEMENTS = [
  ["debounceFn", "debounceFn"],
  ["throttleFn", "throttleFn"],
  ["eventListener", "eventListener"],
  ["windowSize", "windowSize"],
  ["mediaQuery", "mediaQuery"],
  ["breakpoints", "breakpoints"],
  ["geolocation", "geolocation"],
  ["intersectionObserver", "intersectionObserver"],
  ["documentVisibility", "documentVisibility"],
  ["devicePixelRatio", "devicePixelRatio"],
  ["activeElement", "activeElement"],
  ["documentTitle", "documentTitle"],
  ["colorScheme", "colorScheme"],
  ["localStorage", "localStorage"],
  ["resizeObserver", "resizeObserver"],
  ["clickOutside", "clickOutside"],
  ["elementSize", "elementSize"],
  ["keyPress", "keyPress"],
  ["pageLeave", "pageLeave"],
  ["clipboard", "clipboard"],
  ["fullscreen", "fullscreen"],
  ["permission", "permission"],
  ["cssVar", "cssVar"],
  ["favicon", "favicon"],
  ["debounce", "debounce"],
  ["throttle", "throttle"],
  ["previous", "previous"],
  ["counter", "counter"],
  ["boolean", "boolean"],
  ["network", "network"],
  ["hotkeys", "hotkeys"],
  ["interval", "interval"],
  ["timeout", "timeout"],
  ["toggle", "toggle"],
  ["online", "online"],
  ["scroll", "scroll"],
  ["mouse", "mouse"],
  ["hover", "hover"],
  ["focus", "focus"],
  ["idle", "idle"],
  ["hash", "hash"],
  ["WindowSizeOptions", "WindowSizeOptions"],
  ["BreakpointsOptions", "BreakpointsOptions"],
  ["GeolocationOptions", "GeolocationOptions"],
  ["HotkeysOptions", "HotkeysOptions"],
  ["IdleOptions", "IdleOptions"],
  ["KeyPressOptions", "KeyPressOptions"],
  ["MediaQueryOptions", "MediaQueryOptions"],
  ["MouseOptions", "MouseOptions"],
  ["ScrollOptions", "ScrollOptions"],
  ["DevicePixelRatioOptions", "DevicePixelRatioOptions"],
  ["CounterOptions", "CounterOptions"],
  ["LocalStorageOptions", "LocalStorageOptions"],
  ["window-size", "window-size"],
  ["media-query", "media-query"],
  ["breakpoints", "breakpoints"],
  ["geolocation", "geolocation"],
  ["intersection-observer", "intersection-observer"],
  ["document-visibility", "document-visibility"],
  ["device-pixel-ratio", "device-pixel-ratio"],
  ["active-element", "active-element"],
  ["document-title", "document-title"],
  ["color-scheme", "color-scheme"],
  ["local-storage", "local-storage"],
  ["resize-observer", "resize-observer"],
  ["click-outside", "click-outside"],
  ["element-size", "element-size"],
  ["key-press", "key-press"],
  ["page-leave", "page-leave"],
  ["event-listener", "event-listener"],
  ["clipboard", "clipboard"],
  ["fullscreen", "fullscreen"],
  ["permission", "permission"],
  ["css-var", "css-var"],
  ["favicon", "favicon"],
  ["debounce", "debounce"],
  ["throttle", "throttle"],
  ["previous", "previous"],
  ["counter", "counter"],
  ["boolean", "boolean"],
  ["network", "network"],
  ["hotkeys", "hotkeys"],
  ["interval", "interval"],
  ["timeout", "timeout"],
  ["toggle", "toggle"],
  ["online", "online"],
  ["scroll", "scroll"],
  ["mouse", "mouse"],
  ["hover", "hover"],
  ["focus", "focus"],
  ["idle", "idle"],
  ["hash", "hash"],
];

function walkDirs(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name.startsWith("use-")) out.push(p);
      walkDirs(p, out);
    }
  }
  return out;
}

function walkFiles(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkFiles(p, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

// 1. Rename directories (deepest first)
const dirs = walkDirs(SRC).sort((a, b) => b.length - a.length);
for (const dir of dirs) {
  const parent = dirname(dir);
  const next = join(parent, basename(dir).replace(/^use-/, ""));
  renameSync(dir, next);
  console.log("dir:", basename(dir), "->", basename(next));
}

// 2. Rename use-*.ts files
for (const file of walkFiles(SRC, [".ts", ".md"])) {
  const base = basename(file);
  if (!base.startsWith("use-")) continue;
  const next = join(dirname(file), base.replace(/^use-/, ""));
  renameSync(file, next);
  console.log("file:", base, "->", basename(next));
}

// 3. Replace content
const contentRoots = [
  PKG,
  join(ROOT, "apps/docs/src/content/packages/utils"),
  join(ROOT, "apps/docs/src/widgets/package-playground/playgrounds/utils.playground.ts"),
  join(ROOT, "apps/docs/src/widgets/package-overview/constants/package-overview.data.ts"),
  join(ROOT, "packages/.configs/vitest.config.ts"),
];

const files = new Set();
for (const root of contentRoots) {
  try {
    if (statSync(root).isDirectory()) walkFiles(root, [".ts", ".md", ".json", ".mjs"], []).forEach((f) => files.add(f));
    else files.add(root);
  } catch {
    /* skip */
  }
}

for (const file of files) {
  let text = readFileSync(file, "utf8");
  let changed = false;
  for (const [from, to] of REPLACEMENTS) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) writeFileSync(file, text);
}

console.log("Done. Updated", files.size, "files scanned.");
