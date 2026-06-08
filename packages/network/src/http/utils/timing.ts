import type { AdapterTimings } from "../types/adapter";
import type { HttpTimings } from "../types/timings";

export function mergeTimings(
  a: AdapterTimings | undefined,
  b: AdapterTimings | undefined,
): HttpTimings | undefined {
  if (a === undefined && b === undefined) return undefined;
  return { ...a, ...b };
}

export function nowMs(): number {
  return performance.now();
}
