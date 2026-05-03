import type { Child } from "./types";
import type { MountCleanup } from "./lifecycle/on-mount";
import { mount } from "./lifecycle/on-mount";

let viewDepth = 0;

/** Returns true while `createView(...)` is executing (used for strict context checks). */
export const isInViewContext = (): boolean => viewDepth > 0;

/**
 * Wraps a view function to mark "view construction context".
 *
 * This allows strict-mode checks to prevent accidental UI construction at module scope.
 */
export const createView = <VM = void>(viewFn: (vm: VM) => Child): ((vm: VM) => Child) => {
  return (vm: VM): Child => {
    viewDepth++;
    try {
      return viewFn(vm);
    } finally {
      viewDepth--;
    }
  };
};

/**
 * Like `createView`, but also registers a mount/unmount hook for the view.
 *
 * The mount callback runs after the view is inserted into the DOM. If it returns a function,
 * that function runs on unmount (dispose) or when the view region is replaced.
 *
 * Signature is intentionally `(onMount, viewFn)` so you can pass lifecycle first.
 */
export const createViewWithMount = <VM = void>(
  onMount: (vm: VM) => MountCleanup,
  viewFn: (vm: VM) => Child,
): ((vm: VM) => Child) => {
  return createView((vm: VM): Child => [mount(() => onMount(vm)), viewFn(vm)]);
};
