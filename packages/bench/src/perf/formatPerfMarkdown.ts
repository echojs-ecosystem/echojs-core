import type { PerfReport } from "./types";

function formatNumber(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function formatPerfMarkdown(report: PerfReport): string {
  const lines: string[] = [];
  lines.push("## Perf");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(`Node: ${report.node}`);
  lines.push("");
  lines.push("| Group | Case | Iterations | Total (ms) | Mean (ms) | Ops/sec |");
  lines.push("|---|---|---:|---:|---:|---:|");
  for (const r of report.rows) {
    lines.push(
      `| \`${r.group}\` | ${r.name} | ${r.iterations} | ${formatNumber(r.totalMs)} | ${formatNumber(r.meanMs)} | ${formatNumber(r.opsPerSec)} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

