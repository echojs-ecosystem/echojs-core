import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const srcRoot = join(root, "src");
const layers = new Set(["app", "pages", "entities", "features", "widgets", "shared"]);

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : entry.name.endsWith(".ts") ? [path] : [];
  });

const importRe = /from\s+["'](\.[^"']+)["']/g;

const resolveImport = (filePath, spec) => {
  const absBase = resolve(dirname(filePath), spec);
  const tries = [absBase, absBase.replace(/\.js$/, ".ts")];
  return tries.find((p) => existsSync(p)) ?? null;
};

const toAlias = (filePath, spec) => {
  const resolved = resolveImport(filePath, spec);
  if (!resolved?.startsWith(srcRoot + "/")) return null;
  const rel = resolved.slice(srcRoot.length + 1);
  const layer = rel.split("/")[0];
  if (!layers.has(layer)) return null;
  const subpath = rel.slice(layer.length + 1).replace(/\.ts$/, ".js");
  return `@${layer}/${subpath}`;
};

let filesChanged = 0;

for (const file of walk(srcRoot)) {
  const original = readFileSync(file, "utf8");
  const next = original.replace(importRe, (full, spec) => {
    if (!spec.startsWith(".")) return full;
    const alias = toAlias(file, spec);
    if (!alias) return full;
    return `from "${alias}"`;
  });

  if (next !== original) {
    writeFileSync(file, next);
    filesChanged += 1;
  }
}

console.log(`Import aliases applied to ${filesChanged} files.`);
