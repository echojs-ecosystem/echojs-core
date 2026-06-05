import { resolve } from "node:path";

import { listWorkspacePackages } from "./workspacePackages.js";
import { resolveEntry } from "./resolveEntry.js";
import { measureBundle } from "./measureBundle.js";
import type { BundleSizeReport, BundleSizeRow } from "./types.js";

export async function measureWorkspaceBundleSizes(opts: {
  root: string;
  packages?: string[];
  from: "src" | "dist";
  format: "esm" | "iife";
  minify: boolean;
}): Promise<BundleSizeReport> {
  const root = resolve(opts.root);
  const all = await listWorkspacePackages(root);
  const filtered = opts.packages?.length
    ? all.filter((p) => opts.packages!.includes(p.dirName))
    : all;

  const rows: BundleSizeRow[] = [];
  for (const pkg of filtered) {
    const { entry, absEntryPath } = await resolveEntry({
      root,
      packageDirName: pkg.dirName,
      from: opts.from,
    });
    const { bytes, gzipBytes, brotliBytes } = await measureBundle({
      absEntryPath,
      format: opts.format,
      minify: opts.minify,
    });

    rows.push({
      package: pkg.dirName,
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
    root,
    rows,
  };
}

