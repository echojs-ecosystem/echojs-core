import { effect } from "@echojs-ecosystem/reactivity";
import { onCleanup } from "./cleanup";

export function createReactiveEffect(fn: () => void, onDispose?: () => void): () => void {
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
}

