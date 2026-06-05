import { performance } from "node:perf_hooks";
import type { BenchCase, BenchResultRow } from "./types.js";

async function runIterations(fn: () => void | Promise<void>, iterations: number): Promise<number> {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    // eslint-disable-next-line no-await-in-loop
    await fn();
  }
  const end = performance.now();
  return end - start;
}

export async function runBenchCase(c: BenchCase): Promise<BenchResultRow> {
  const warmup = c.warmupIterations ?? 50;
  const iterations = c.iterations ?? 500;

  if (warmup > 0) {
    await runIterations(c.fn, warmup);
  }

  const totalMs = await runIterations(c.fn, iterations);
  const meanMs = totalMs / iterations;
  const opsPerSec = iterations / (totalMs / 1000);

  return {
    group: c.group,
    name: c.name,
    iterations,
    totalMs,
    meanMs,
    opsPerSec,
  };
}

