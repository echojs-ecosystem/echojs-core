import { effect } from "@echojs-ecosystem/reactivity";
import { onCleanup } from "./cleanup";

/**
 * Registers a reactive effect in the current cleanup scope.
 *
 * Returns the disposer function (also registered with `onCleanup`).
 */
export const createReactiveEffect = (fn: () => void, onDispose?: () => void): (() => void) => {
  const dispose = effect(fn);
  const wrapped = () => {
    try {
      dispose();
    } finally {
      onDispose?.();
    }
  };
  onCleanup(wrapped);
  return wrapped;
};
