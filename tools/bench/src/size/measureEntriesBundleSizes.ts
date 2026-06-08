import { join, resolve } from "node:path";
import { readFile } from "node:fs/promises";

import { measureBundle } from "./measureBundle";
import type { BundleSizeReport, BundleSizeRow } from "./types";

type ExportsField =
  | string
  | { default?: string; types?: string }
  | Record<string, unknown>
  | undefined;

function guessDefaultExportPath(exp: ExportsField): string | undefined {
  if (typeof exp === "string") return exp;
  if (typeof exp === "object" && exp) return (exp as { default?: string }).default;
  return undefined;
}

async function resolveWorkspaceEntry(opts: {
  root: string;
  packageDirName: string;
  subpath?: string;
  from: "src" | "dist";
}): Promise<{ entry: string; absEntryPath: string }> {
  const root = resolve(opts.root);
  const pkgAbs = join(root, "packages", opts.packageDirName);
  const subpath = opts.subpath?.trim().replace(/^\//, "");

  if (opts.from === "src") {
    const file =
      !subpath || subpath === "."
        ? "index.ts"
        : `${subpath.split("/").filter(Boolean).join("-")}.ts`;
    const absEntryPath = join(pkgAbs, "src", file);
    return { entry: `packages/${opts.packageDirName}/src/${file}`, absEntryPath };
  }

  const pkgJsonPath = join(pkgAbs, "package.json");
  const pkgJson = JSON.parse(await readFile(pkgJsonPath, "utf8")) as {
    exports?: Record<string, ExportsField>;
    main?: string;
    module?: string;
  };

  const exportKey = !subpath || subpath === "." ? "." : `./${subpath}`;
  const exp = pkgJson.exports?.[exportKey] as ExportsField;

  const guess =
    guessDefaultExportPath(exp) ??
    (exportKey === "." ? pkgJson.module ?? pkgJson.main ?? "./dist/index" : undefined);

  if (!guess) {
    throw new Error(
      `Cannot resolve export ${exportKey} for packages/${opts.packageDirName}. Add it to package.json "exports".`,
    );
  }

  const absEntryPath = join(pkgAbs, guess);
  return { entry: `packages/${opts.packageDirName}/${guess.replace(/^\.\//, "")}`, absEntryPath };
}

export async function measureEntriesBundleSizes(opts: {
  root: string;
  entries: string[];
  from: "src" | "dist";
  format: "esm" | "iife";
  minify: boolean;
}): Promise<BundleSizeReport> {
  const rows: BundleSizeRow[] = [];

  for (const raw of opts.entries) {
    const spec = raw.trim();
    if (!spec) continue;

    const [packageDirName, ...sub] = spec.split("/").filter(Boolean);
    if (!packageDirName) continue;
    const subpath = sub.length ? sub.join("/") : undefined;

    const { entry, absEntryPath } = await resolveWorkspaceEntry({
      root: opts.root,
      packageDirName,
      subpath,
      from: opts.from,
    });
    const { bytes, gzipBytes, brotliBytes } = await measureBundle({
      absEntryPath,
      format: opts.format,
      minify: opts.minify,
    });

    rows.push({
      package: spec,
      entry,
      bytes,
      gzipBytes,
      brotliBytes,
    });
  }

  rows.sort((a, b) => a.gzipBytes - b.gzipBytes);

  return {
    kind: "bundle-size",
    generatedAt: new Date().toISOString(),
    node: process.version,
    root: resolve(opts.root),
    rows,
  };
}

