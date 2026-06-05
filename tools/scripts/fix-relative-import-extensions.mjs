import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["packages"];

const isTextTsFile = (path) => path.endsWith(".ts") || path.endsWith(".tsx") || path.endsWith(".d.ts");

const rewriteImports = (code) => {
  // Remove `.js` from *relative* ESM specifiers in import/export statements.
  // Examples:
  // - import { x } from "./x.js"   -> "./x"
  // - export * from "../y.js"      -> "../y"
  // - import type { T } from "./t.js" -> "./t"
  //
  // We intentionally do NOT touch package imports like "@echojs-ecosystem/foo".
  return code
    .replace(
      /\b(from\s+["'])(\.{1,2}\/[^"'?#]+?)\.js(["'])/g,
      (_m, p1, p2, p3) => `${p1}${p2}${p3}`,
    )
    .replace(
      /\b(import\s*\(\s*["'])(\.{1,2}\/[^"'?#]+?)\.js(["']\s*\))/g,
      (_m, p1, p2, p3) => `${p1}${p2}${p3}`,
    );
};

const walk = async (dir, out) => {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name === "node_modules" || ent.name === "dist" || ent.name === ".turbo") continue;
    const full = join(dir, ent.name);
    if (ent.isDirectory()) {
      await walk(full, out);
      continue;
    }
    if (!ent.isFile()) continue;
    if (!isTextTsFile(full)) continue;
    out.push(full);
  }
};

const main = async () => {
  const files = [];
  for (const d of TARGET_DIRS) {
    await walk(join(ROOT, d), files);
  }

  let changed = 0;
  for (const file of files) {
    const before = await readFile(file, "utf8");
    const after = rewriteImports(before);
    if (after !== before) {
      await writeFile(file, after, "utf8");
      changed += 1;
    }
  }

  process.stdout.write(`Rewrote relative .js extensions in ${changed} files\n`);
};

await main();

