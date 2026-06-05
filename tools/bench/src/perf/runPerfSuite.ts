import { resolve } from "node:path";

import type { PerfReport } from "./types.js";
import { createDefaultBenches } from "./defaultBenches.js";
import { runBenchCase } from "./runBench.js";

export async function runPerfSuite(opts: {
  root: string;
  packages?: string[];
}): Promise<PerfReport> {
  const root = resolve(opts.root);
  const cases = await createDefaultBenches(opts.packages);

  const rows = [];
  for (const c of cases) {
    // eslint-disable-next-line no-await-in-loop
    rows.push(await runBenchCase(c));
  }

  rows.sort((a, b) => a.group.localeCompare(b.group) || b.opsPerSec - a.opsPerSec);

  return {
    kind: "perf",
    generatedAt: new Date().toISOString(),
    node: process.version,
    root,
    rows,
  };
}

