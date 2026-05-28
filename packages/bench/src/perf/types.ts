export type BenchCase = {
  name: string;
  group: string;
  fn: () => void | Promise<void>;
  warmupIterations?: number;
  iterations?: number;
};

export type BenchResultRow = {
  group: string;
  name: string;
  iterations: number;
  totalMs: number;
  meanMs: number;
  opsPerSec: number;
};

export type PerfReport = {
  kind: "perf";
  generatedAt: string;
  node: string;
  root: string;
  rows: BenchResultRow[];
};

