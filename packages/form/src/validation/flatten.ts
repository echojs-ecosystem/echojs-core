import type { StandardSchemaIssue } from "../types";

const pathKey = (path: readonly (string | number | symbol)[] | undefined): string =>
  (path ?? [])
    .map((segment) => (typeof segment === "symbol" ? String(segment) : String(segment)))
    .join(".");

/**
 * Turns Standard Schema-ish issues into a flat map keyed by dotted paths.
 *
 * Issues without paths are aggregated under `"$root"` (useful for form-level errors).
 */
export const flattenFieldErrors = (
  issues: readonly StandardSchemaIssue[],
): Record<string, string[]> => {
  const out: Record<string, string[]> = {};

  for (const issue of issues) {
    const key = pathKey(issue.path);
    const resolvedKey = key.length ? key : "$root";

    const arr = out[resolvedKey] ?? [];
    arr.push(issue.message);
    out[resolvedKey] = arr;
  }

  return out;
};
