#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { measureWorkspaceBundleSizes } from "./size/measureWorkspaceBundleSizes";
import { measureEntriesBundleSizes } from "./size/measureEntriesBundleSizes";
import { formatBundleSizeMarkdown } from "./size/formatBundleSizeMarkdown";
import { runPerfSuite } from "./perf/runPerfSuite";
import { formatPerfMarkdown } from "./perf/formatPerfMarkdown";

type Command = "size" | "perf";

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

function splitCsv(value: string | undefined): string[] | undefined {
  if (!value) return undefined;
  const items = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
}

async function writeReportFiles(
  outDir: string,
  basename: string,
  json: unknown,
  markdown: string,
) {
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, `${basename}.json`), JSON.stringify(json, null, 2) + "\n", "utf8");
  await writeFile(join(outDir, `${basename}.md`), markdown.trimEnd() + "\n", "utf8");
}

async function main() {
  const cmd = (process.argv[2] ?? "") as Command;
  const root = resolve(getArg("--root") ?? process.cwd());
  const outDir = resolve(getArg("--outDir") ?? join(root, "tools/bench-results"));

  if (cmd !== "size" && cmd !== "perf") {
    // eslint-disable-next-line no-console
    console.log(
      [
        "echojs-bench <command> [options]",
        "",
        "Commands:",
        "  size   Measure bundle size (min/gzip/brotli) via esbuild",
        "  perf   Run micro-benchmarks and emit JSON/markdown report",
        "",
        "Options:",
        "  --root <path>         Workspace root (default: cwd)",
        "  --outDir <path>       Output directory (default: <root>/tools/bench-results)",
        "  --packages <csv>      Filter packages, e.g. core,reactivity,store",
        "  --entries <csv>       Measure exact entries, e.g. framework/core,framework/router/hyperdom",
        "  --from <src|dist>     Entry source for bundle size (default: src)",
        "  --format <esm|iife>   Bundle format (default: esm)",
        "  --no-minify          Disable minification",
      ].join("\n"),
    );
    process.exit(1);
  }

  const packages = splitCsv(getArg("--packages"));
  const entries = splitCsv(getArg("--entries"));

  if (cmd === "size") {
    const from = (getArg("--from") ?? "src") as "src" | "dist";
    const format = (getArg("--format") ?? "esm") as "esm" | "iife";
    const minify = hasFlag("--no-minify") ? false : true;

    const report = entries?.length
      ? await measureEntriesBundleSizes({
          root,
          entries,
          from,
          format,
          minify,
        })
      : await measureWorkspaceBundleSizes({
          root,
          packages,
          from,
          format,
          minify,
        });
    const md = formatBundleSizeMarkdown(report);

    await writeReportFiles(outDir, "bundle-size", report, md);
    // eslint-disable-next-line no-console
    console.log(`Wrote bundle size report to ${outDir}`);
    return;
  }

  const report = await runPerfSuite({ root, packages });
  const md = formatPerfMarkdown(report);
  await writeReportFiles(outDir, "perf", report, md);
  // eslint-disable-next-line no-console
  console.log(`Wrote perf report to ${outDir}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

