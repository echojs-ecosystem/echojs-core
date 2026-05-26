import type { Child } from "./types";
/**
 * Renders a `Child` view into a container element.
 *
 * Establishes a cleanup scope, mounts the initial tree, then activates deferred bindings.
 * Returns a `dispose()` function that tears down reactive resources and clears the container.
 */
export declare const render: (view: Child, container: Element) => (() => void);
//# sourceMappingURL=render.d.ts.map