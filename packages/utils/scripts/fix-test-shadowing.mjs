#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SRC = join(import.meta.dirname, "../src");

const UTILS = [
  "windowSize", "mediaQuery", "breakpoints", "mouse", "scroll", "network", "online",
  "idle", "geolocation", "hotkeys", "keyPress", "pageLeave",
  "clipboard", "documentTitle", "favicon", "colorScheme", "documentVisibility",
  "devicePixelRatio", "fullscreen", "activeElement", "permission", "cssVar",
  "timeout", "interval", "debounce", "throttle", "toggle", "counter", "boolean",
  "previous", "localStorage", "hash",
  "elementSize", "resizeObserver", "intersectionObserver", "clickOutside", "hover", "focus",
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".test.ts") || name.endsWith(".test-d.ts")) out.push(p);
  }
  return out;
}

for (const file of walk(SRC)) {
  let text = readFileSync(file, "utf8");
  let changed = false;

  for (const util of UTILS) {
    const alias = `create${util[0].toUpperCase()}${util.slice(1)}`;
    const importRe = new RegExp(`import \\{ ${util} \\} from`, "g");
    if (importRe.test(text) && !text.includes(`${util} as ${alias}`)) {
      text = text.replace(importRe, `import { ${util} as ${alias} } from`);
      changed = true;
    }
    const callRe = new RegExp(`(?<![a-zA-Z])${util}\\(`, "g");
    if (text.includes(alias) && callRe.test(text)) {
      text = text.replace(callRe, `${alias}(`);
      changed = true;
    }
  }

  if (file.includes("local-storage") && text.includes("createLocalStorage")) {
    const fixed = text
      .replace(/(?<!globalThis\.)(?<!window\.)localStorage\.(clear|getItem|setItem|removeItem)/g, "globalThis.localStorage.$1")
      .replace(/storageArea: localStorage/g, "storageArea: globalThis.localStorage");
    if (fixed !== text) {
      text = fixed;
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(file, text);
    console.log("fixed:", file.replace(SRC, ""));
  }
}
