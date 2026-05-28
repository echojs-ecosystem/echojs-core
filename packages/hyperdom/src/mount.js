import { render } from "./render";
/**
 * Mounts a view into a container element.
 *
 * Creates a container `<div>` by default and returns `{ node, dispose }`.
 */
export const mount = (view, options) => {
    const node = options?.container ?? document.createElement("div");
    if (options?.className)
        node.className = options.className;
    const dispose = render(view, node);
    // Optional interop with @echojs-ecosystem/core unmount() mechanism.
    node.__echoDispose = dispose;
    return { node, dispose };
};
//# sourceMappingURL=mount.js.map