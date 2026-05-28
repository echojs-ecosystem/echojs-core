import { createScope, disposeScope, runWithScope } from "./lifecycle/cleanup";
import { mountChild, mountChildren } from "./dom/children";
import { activateTree } from "./dom/activate-tree";
/**
 * Renders a `Child` view into a container element.
 *
 * Establishes a cleanup scope, mounts the initial tree, then activates deferred bindings.
 * Returns a `dispose()` function that tears down reactive resources and clears the container.
 */
export const render = (view, container) => {
    container.textContent = "";
    const scope = createScope();
    runWithScope(scope, () => {
        if (Array.isArray(view))
            mountChildren(container, view, null);
        else
            mountChild(container, view, null);
        // Activate deferred reactive props/events/regions inside the current scope.
        activateTree(container);
    });
    return () => {
        disposeScope(scope);
        container.textContent = "";
    };
};
//# sourceMappingURL=render.js.map