import type { Child } from "../types";
export type MountCleanup = void | (() => void);
/**
 * "onMount" hook implemented as a `Child`.
 *
 * Usage:
 *
 * - `div(null, mount(() => { ...; return () => ... }))`
 *
 * The callback runs after the node is inserted into the DOM and bindings are being activated
 * inside an active cleanup scope. If the callback returns a function, it will be registered as
 * cleanup (unmount) handler.
 */
export declare const mountLifecycleHook: (fn: () => MountCleanup) => Child;
/** Public name for the mount lifecycle hook. */
export { mountLifecycleHook as mount };
//# sourceMappingURL=on-mount.d.ts.map