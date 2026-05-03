import type { Child } from "../types";

/**
 * Conditional region helper.
 *
 * Returns a dynamic child that re-evaluates `condition()` and renders either `then()` or
 * `fallback()` on each update.
 */
export const Show = (
  condition: () => boolean,
  then: () => Child,
  fallback?: () => Child,
): (() => Child) => {
  return () => (condition() ? then() : fallback ? fallback() : null);
};
