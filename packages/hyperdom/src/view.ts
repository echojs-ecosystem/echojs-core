import type { Child } from "./types";

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
