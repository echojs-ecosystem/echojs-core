#!/usr/bin/env node
/**
 * Ensures all packages in the changeset fixed group are npm-publishable.
 * Idempotent — safe to re-run when adding new packages.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = "https://github.com/echojs-ecosystem/echojs-core.git";

/** Must match `.changeset/config.json` fixed group. */
const PUBLISHABLE = [
  { name: "@echojs/reactivity", dir: "reactivity" },
  { name: "@echojs/core", dir: "core" },
  { name: "@echojs/hyperdom", dir: "hyperdom" },
  { name: "@echojs/framework", dir: "framework" },
  { name: "@echojs/router", dir: "router" },
  { name: "@echojs/form", dir: "form" },
  { name: "@echojs/persist", dir: "persist" },
  { name: "@echojs/store", dir: "store" },
  { name: "@echojs/query", dir: "query" },
  { name: "@echojs/url-state", dir: "url-state" },
  { name: "@echojs/i18n", dir: "i18n" },
  { name: "@echojs/ui", dir: "ui" },
  { name: "@echojs/architect", dir: "architect" },
  { name: "@echojs/devtools-core", dir: "devtools-core" },
];

for (const { name, dir } of PUBLISHABLE) {
  const path = join(root, "packages", dir, "package.json");
  const pkg = JSON.parse(readFileSync(path, "utf8"));

  if (pkg.name !== name) {
    throw new Error(`Expected ${name} in ${path}, got ${pkg.name}`);
  }

  delete pkg.private;
  pkg.publishConfig = { access: "public", ...pkg.publishConfig };
  pkg.repository = {
    type: "git",
    url: REPO,
    directory: `packages/${dir}`,
  };

  writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
  console.log(`Configured ${name}`);
}
