/** Reads an array from either a signal-like source or a getter function. */
const readSource = (source) => {
    if (typeof source === "function")
        return source();
    return source.value();
};
/**
 * List rendering helper.
 *
 * Returns a function so the list can be used as a dynamic child and re-evaluated when reactive
 * dependencies change.
 */
export const List = (source, renderItem) => {
    return () => {
        const arr = readSource(source);
        return arr.map((item, i) => renderItem(item, () => i));
    };
};
//# sourceMappingURL=list.js.map