import type { BundleSizeReport } from "./types.js";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  const kb = n / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} kB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export function formatBundleSizeMarkdown(report: BundleSizeReport): string {
  const lines: string[] = [];
  lines.push("## Bundle size");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(`Node: ${report.node}`);
  lines.push("");
  lines.push("| Package | Entry | Minified | Gzip | Brotli |");
  lines.push("|---|---|---:|---:|---:|");
  for (const r of report.rows) {
    lines.push(
      `| \`${r.package}\` | \`${r.entry}\` | ${formatBytes(r.bytes)} | ${formatBytes(r.gzipBytes)} | ${formatBytes(r.brotliBytes)} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

