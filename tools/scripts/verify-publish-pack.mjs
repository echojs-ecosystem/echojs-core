#!/usr/bin/env node
/**
 * Packs each publishable package with `bun pm pack` and fails if the tarball
 * still contains workspace:/catalog:/file: dependency protocols.
 */
import { execSync } from "node:child_process";
import { readFileSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Must match `.changeset/config.json` fixed group. */
const PUBLISHABLE = [
  "reactivity",
  "core",
  "hyperdom",
  "framework",
  "router",
  "form",
  "persist",
  "store",
  "query",
  "url-state",
  "i18n",
  "ui",
  "architect",
  "devtools",
  "network",
];

const DEP_FIELDS = ["dependencies", "peerDependencies", "optionalDependencies"];

const badRefs = (pkgJson) => {
  /** @type {string[]} */
  const hits = [];

  for (const field of DEP_FIELDS) {
    const deps = pkgJson[field];
    if (!deps || typeof deps !== "object") continue;

    for (const [name, version] of Object.entries(deps)) {
      if (
        typeof version === "string" &&
        (version.startsWith("workspace:") ||
          version.startsWith("catalog:") ||
          version.startsWith("file:"))
      ) {
        hits.push(`${field}.${name} = ${version}`);
      }
    }
  }

  return hits;
};

let failed = false;

for (const dir of PUBLISHABLE) {
  const pkgDir = join(root, "packages", dir);
  const name = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")).name;

  let tarball = "";
  try {
    const output = execSync("bun pm pack", { cwd: pkgDir, encoding: "utf8" });
    tarball =
      output
        .trim()
        .split("\n")
        .find((line) => line.endsWith(".tgz")) ?? "";
    if (!tarball) {
      throw new Error("bun pm pack did not print a .tgz filename");
    }
  } catch (error) {
    console.error(`✗ ${name}: bun pm pack failed`);
    console.error(error instanceof Error ? error.message : error);
    failed = true;
    continue;
  }

  const tarballPath = join(pkgDir, tarball);
  let packed = "";

  try {
    packed = execSync(`tar -xOf "${tarballPath}" package/package.json`, { encoding: "utf8" });
  } catch (error) {
    console.error(`✗ ${name}: failed to read packed package.json`);
    console.error(error instanceof Error ? error.message : error);
    failed = true;
  } finally {
    try {
      unlinkSync(tarballPath);
    } catch {
      // ignore cleanup errors
    }
  }

  if (!packed) continue;

  const hits = badRefs(JSON.parse(packed));
  if (hits.length) {
    failed = true;
    console.error(`✗ ${name}: unresolved local protocols in tarball:`);
    for (const hit of hits) console.error(`  - ${hit}`);
  } else {
    console.log(`✓ ${name}`);
  }
}

if (failed) {
  console.error(
    "\nPublish aborted: run `bun update` after `changeset version`, then retry.\n",
  );
  process.exit(1);
}

console.log("\nAll publishable packages pack cleanly for npm.\n");
