import type { StandardSchemaIssue, StandardSchemaLike } from "../types";

const asRecord = (v: unknown): Record<string, unknown> | null =>
  typeof v === "object" && v !== null ? (v as Record<string, unknown>) : null;

const isIssueLikeArray = (
  v: unknown,
): v is readonly { message: string; path?: ReadonlyArray<unknown> | undefined }[] =>
  Array.isArray(v) &&
  v.every(
    (x) => x && typeof x === "object" && typeof (x as { message?: unknown }).message === "string",
  );

export const normalizeStandardSchemaPathSegments = (
  path?: ReadonlyArray<unknown> | undefined,
): string[] =>
  Array.from(path ?? []).map((segment) => {
    if (typeof segment === "string" || typeof segment === "number") return String(segment);
    if (typeof segment === "symbol") return String(segment);

    if (segment && typeof segment === "object" && "key" in (segment as any)) {
      const key = (segment as { key: PropertyKey }).key;
      return typeof key === "symbol" ? String(key) : String(key);
    }

    return String(segment as any);
  });

/**
 * Normalize common Standard Schema validation result shapes into a flat `{ issues[] }`.
 *
 * Covers:
 * - `{ issues: [...] }`
 * - `{ errors: [...] }` (some wrappers)
 * - `{ value }` → no issues (success-ish)
 */
export const normalizeStandardSchemaIssues = (result: unknown): StandardSchemaIssue[] => {
  if (typeof result === "string") return [{ message: result }];

  if (Array.isArray(result) && result.every((x) => typeof x === "string")) {
    return (result as string[]).map((message) => ({ message }));
  }

  if (Array.isArray(result) && isIssueLikeArray(result)) {
    return Array.from(result).map((i) => ({
      message: i.message,
      path: normalizeStandardSchemaPathSegments(i.path ?? []),
    }));
  }

  const rec = asRecord(result);
  if (!rec) return [];

  const directIssues = rec.issues ?? rec.errors ?? rec.issue;
  if (Array.isArray(directIssues) && isIssueLikeArray(directIssues)) {
    return Array.from(directIssues).map((i) => ({
      message: i.message,
      path: normalizeStandardSchemaPathSegments(i.path ?? []),
    }));
  }

  // Some adapters return `{ value }` directly on success without `issues`.
  if ("value" in rec && !("issues" in rec)) return [];

  // Last resort: if it looks like a failure object with a single message field.
  const message = rec.message;
  if (typeof message === "string") return [{ message }];

  return [];
};

/**
 * Runs `StandardSchema`'s `.validate()` and normalizes failures into `{ issues }`.
 *
 * Handles Promise results automatically.
 */
export const standardSchemaIssuesForUnknown = async (
  schema: StandardSchemaLike<unknown>,
  value: unknown,
): Promise<{ ok: boolean; issues: StandardSchemaIssue[] }> => {
  const raw = schema["~standard"].validate(value) as unknown;
  const result = raw instanceof Promise ? await raw : raw;

  const rec =
    typeof result === "object" && result !== null ? (result as Record<string, unknown>) : null;
  const issuesUnknown =
    rec && Object.prototype.hasOwnProperty.call(rec, "issues") ? rec.issues : undefined;

  if (
    Array.isArray(issuesUnknown) &&
    issuesUnknown.every((issue) => issue && typeof (issue as any).message === "string")
  ) {
    const issues = Array.from(
      issuesUnknown as readonly { message: string; path?: ReadonlyArray<unknown> }[],
    ).map((issue) => ({
      message: issue.message,
      path: normalizeStandardSchemaPathSegments(issue.path ?? []),
    }));

    return issues.length > 0 ? { ok: false, issues } : { ok: true, issues: [] };
  }

  const issues = normalizeStandardSchemaIssues(result);
  return issues.length > 0 ? { ok: false, issues } : { ok: true, issues: [] };
};

/**
 * Same as `standardSchemaIssuesForUnknown()`, but resolves immediately when the vendor returns sync results.
 *
 * Throws if validation returns a Promise (use `standardSchemaIssuesForUnknown()` / `validateAsync()` instead).
 */
export const standardSchemaIssuesForUnknownSync = (
  schema: StandardSchemaLike<unknown>,
  value: unknown,
): { ok: boolean; issues: StandardSchemaIssue[] } => {
  const raw = schema["~standard"].validate(value) as unknown;
  if (raw instanceof Promise) {
    throw new Error(
      "[@echojs/form] Schema validation returned a Promise. Use field.validateAsync() / form.validateAsync(), or wrap with async handling.",
    );
  }

  const rec = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : null;
  const issuesUnknown =
    rec && Object.prototype.hasOwnProperty.call(rec, "issues") ? rec.issues : undefined;

  if (
    Array.isArray(issuesUnknown) &&
    issuesUnknown.every((issue) => issue && typeof (issue as any).message === "string")
  ) {
    const issues = Array.from(
      issuesUnknown as readonly { message: string; path?: ReadonlyArray<unknown> }[],
    ).map((issue) => ({
      message: issue.message,
      path: normalizeStandardSchemaPathSegments(issue.path ?? []),
    }));

    return issues.length > 0 ? { ok: false, issues } : { ok: true, issues: [] };
  }

  const issues = normalizeStandardSchemaIssues(raw);
  return issues.length > 0 ? { ok: false, issues } : { ok: true, issues: [] };
};
