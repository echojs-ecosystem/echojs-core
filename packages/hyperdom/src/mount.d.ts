import type { Child } from "./types";
export interface MountResult {
    node: HTMLElement;
    dispose: () => void;
}
/**
 * Mounts a view into a container element.
 *
 * Creates a container `<div>` by default and returns `{ node, dispose }`.
 */
export declare const mount: (view: Child, options?: {
    container?: HTMLElement;
    className?: string;
}) => MountResult;
//# sourceMappingURL=mount.d.ts.map