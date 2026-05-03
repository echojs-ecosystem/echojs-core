import type { Child } from "../types";
import { addBinding } from "../dom/bindings";
import { onCleanup, getCurrentScope } from "./cleanup";
import { getStrictContextChecks } from "../config";
import { isInViewContext } from "../view";

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
export const mountLifecycleHook = (fn: () => MountCleanup): Child => {
  if (getStrictContextChecks() && !isInViewContext() && !getCurrentScope()) {
    throw new Error(
      "hyperdom: mount() called outside of view/render context. Call it while rendering (as a child), or inside createView(...).",
    );
  }

  const marker = document.createComment("hyperdom:mount");

  addBinding(marker, () => {
    const cleanup = fn();
    if (typeof cleanup === "function") onCleanup(cleanup);

    // Remove marker on scope dispose so it doesn't leak into output DOM.
    onCleanup(() => marker.parentNode?.removeChild(marker));
  });

  return marker;
};

/** Public name for the mount lifecycle hook. */
export { mountLifecycleHook as mount };
