#!/usr/bin/env node
/**
 * Publish all @echojs-ecosystem/* packages with `bun publish`.
 *
 * `changeset publish` uses npm and leaves workspace:* in the tarball — broken for Bun
 * workspaces. Bun publish resolves workspace:/catalog: at pack time.
 *
 * Usage:
 *   node tools/scripts/publish-all.mjs [--tag latest] [--no-git-tag]
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Dependency-safe publish order (framework meta-package last). */
const PUBLISHABLE = [
  "reactivity",
  "core",
  "devtools",
  "store",
  "hyperdom",
  "i18n",
  "url-state",
  "query",
  "persist",
  "form",
  "router",
  "ui",
  "framework",
  "architect",
];

const tagFlagIndex = process.argv.indexOf("--tag");
const tag = tagFlagIndex >= 0 ? process.argv[tagFlagIndex + 1] : "latest";
const noGitTag = process.argv.includes("--no-git-tag");

const isAlreadyPublished = (name, version) => {
  try {
    const remote = execSync(`npm view ${name}@${version} version`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return remote === version;
  } catch {
    return false;
  }
};

/** @type {string[]} */
const published = [];

for (const dir of PUBLISHABLE) {
  const pkgDir = join(root, "packages", dir);
  const pkg = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));

  if (pkg.private) {
    console.log(`· skip ${pkg.name} (private)`);
    continue;
  }

  if (isAlreadyPublished(pkg.name, pkg.version)) {
    console.log(`· skip ${pkg.name}@${pkg.version} (already on npm)`);
    continue;
  }

  const args = ["publish", "--access", "public"];
  if (tag && tag !== "latest") args.push("--tag", tag);

  console.log(`→ bun ${args.join(" ")}  (${pkg.name}@${pkg.version})`);
  execSync(`bun ${args.map((a) => JSON.stringify(a)).join(" ")}`, {
    cwd: pkgDir,
    stdio: "inherit",
  });
  published.push(`${pkg.name}@${pkg.version}`);
}

if (published.length === 0) {
  console.log("\nNothing new to publish.\n");
} else {
  console.log(`\nPublished ${published.length} package(s):\n  ${published.join("\n  ")}\n`);
}

if (!noGitTag && published.length > 0) {
  execSync("changeset tag", { cwd: root, stdio: "inherit" });
}
