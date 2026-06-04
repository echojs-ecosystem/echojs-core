import { brandReadonly } from "./internals/guards.js";
import type { ReadonlySignal, Signal } from "./types";
import { isFunction } from "./utils";

export const readonly = <T>(sig: Signal<T> | ReadonlySignal<T>): ReadonlySignal<T> => {
  if (!isFunction((sig as any).set)) return sig as ReadonlySignal<T>;
  if (!isFunction((sig as any).readonly)) return (sig as Signal<T>).readonly();

  return brandReadonly({
    value: () => sig.value(),
    peek: () => sig.peek(),
    subscribe: (fn: () => void) => sig.subscribe(fn),
  }) as ReadonlySignal<T>;
};
