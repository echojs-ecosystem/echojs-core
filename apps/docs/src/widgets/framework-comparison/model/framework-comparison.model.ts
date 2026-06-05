import { comparisonFrameworks } from "@shared/home/framework-comparison.js";
import type { FrameworkId, PerformanceRow } from "@shared/home/framework-comparison.js";

export const bestPerformanceIds = (row: PerformanceRow): Set<FrameworkId> => {
  const entries = comparisonFrameworks.map((f) => ({
    id: f.id,
    value: row.values[f.id],
  }));
  const target = row.lowerIsBetter
    ? Math.min(...entries.map((e) => e.value))
    : Math.max(...entries.map((e) => e.value));
  return new Set(entries.filter((e) => e.value === target).map((e) => e.id));
};
