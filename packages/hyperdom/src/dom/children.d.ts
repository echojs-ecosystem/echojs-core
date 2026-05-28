import type { Child } from "../types";
/**
 * Mounts a single `Child` value into the DOM.
 *
 * Returns the list of inserted nodes for bookkeeping by higher-level mounts.
 */
export declare const mountChild: (parent: Node, child: Child, before: Node | null) => Node[];
/** Mounts an array of children into the DOM. */
export declare const mountChildren: (parent: Node, children: Child[], before: Node | null) => Node[];
//# sourceMappingURL=children.d.ts.map