import { setProps } from "./props";
import { mountChild, mountChildren } from "./children";
/**
 * Creates an element for an intrinsic tag, or calls a component function.
 *
 * - Intrinsic tags are created via `document.createElement(...)`
 * - Props are applied via `setProps(...)`
 * - Children are mounted immediately
 */
export const createNode = (tag, props, children) => {
    if (typeof tag === "function") {
        const nextProps = { ...(props ?? {}), children };
        return tag(nextProps);
    }
    // Note: createElement supports both HTML and SVG tag names.
    const element = document.createElement(tag);
    setProps(element, props ?? null);
    if (children !== undefined) {
        if (Array.isArray(children))
            mountChildren(element, children, null);
        else
            mountChild(element, children, null);
    }
    return element;
};
//# sourceMappingURL=create-node.js.map