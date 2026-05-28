/**
 * Conditional region helper.
 *
 * Returns a dynamic child that re-evaluates `condition()` and renders either `then()` or
 * `fallback()` on each update.
 */
export const Show = (condition, then, fallback) => {
    return () => (condition() ? then() : fallback ? fallback() : null);
};
//# sourceMappingURL=show.js.map