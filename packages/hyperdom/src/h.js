import { createNode } from "./dom/create-node";
import { getStrictContextChecks } from "./config";
import { isInViewContext } from "./view-context";
import { getCurrentScope } from "./lifecycle/cleanup";
/** True when a value looks like a props bag (not a child). */
const isProps = (value) => {
    return (value === null ||
        (typeof value === "object" &&
            value !== null &&
            !Array.isArray(value) &&
            !value.nodeType));
};
/** Normalizes `children` arguments into a single `Child` value. */
const normalizeChildren = (list) => {
    if (list.length === 0)
        return undefined;
    if (list.length === 1)
        return list[0];
    return list;
};
/**
 * Creates a DOM node (or calls a component function) with props and children.
 *
 * Supports a convenience call shape: `h("div", "text")` (treat second arg as children when it
 * doesn't look like a props object).
 */
export const h = ((tag, props, children, ...rest) => {
    // Strict mode: prevent accidental UI construction at module scope.
    // But allow calls inside:
    // - createView() (initial view creation)
    // - render()/dynamic regions/effects (they run under a lifecycle scope)
    if (getStrictContextChecks() && !isInViewContext() && !getCurrentScope()) {
        throw new Error("hyperdom: h() called outside of view/render context. Wrap UI creation in createView(...), or call it while rendering.");
    }
    // Support h('div', 'text') and h('div', [..]) as a convenience
    if (children === undefined && rest.length === 0 && props !== undefined && !isProps(props)) {
        return createNode(tag, null, props);
    }
    const normalized = normalizeChildren(children === undefined ? [] : [children, ...rest]);
    return createNode(tag, props ?? null, normalized);
});
//# sourceMappingURL=h.js.map