#!/usr/bin/env node
/**
 * Ensures all packages in the changeset fixed group are npm-publishable.
 * Idempotent — safe to re-run when adding new packages.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const REPO = "https://github.com/echojs-ecosystem/echojs-core.git";

/** Must match `.changeset/config.json` fixed group. */
const PUBLISHABLE = [
  { name: "@echojs-ecosystem/reactivity", dir: "reactivity" },
  { name: "@echojs-ecosystem/hyperdom", dir: "hyperdom" },
  { name: "@echojs-ecosystem/framework", dir: "framework" },
  { name: "@echojs-ecosystem/router", dir: "router" },
  { name: "@echojs-ecosystem/form", dir: "form" },
  { name: "@echojs-ecosystem/persist", dir: "persist" },
  { name: "@echojs-ecosystem/store", dir: "store" },
  { name: "@echojs-ecosystem/async", dir: "async" },
  { name: "@echojs-ecosystem/url-state", dir: "url-state" },
  { name: "@echojs-ecosystem/i18n", dir: "i18n" },
  { name: "@echojs-ecosystem/ui", dir: "ui" },
  { name: "@echojs-ecosystem/architect", dir: "architect" },
  { name: "@echojs-ecosystem/devtools", dir: "devtools" },
  { name: "@echojs-ecosystem/utils", dir: "utils" },
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
