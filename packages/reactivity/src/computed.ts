import { createSubscribe } from "./subscribe";
import { createAlienComputed, untrack } from "./internals/alien.js";
import { brandReadonly } from "./internals/guards.js";
import type { ReadonlySignal, ReadValue } from "./types";
import { isFunction } from "./utils";

export const computed = <T>(getter: () => T): ReadonlySignal<T> => {
  if (!isFunction(getter)) {
    throw new TypeError("computed(getter) expects a function");
  }

  const engine = createAlienComputed<T>(() => getter());

  const readTracked = (): T => engine();
  const readUntracked = (): T => untrack(() => engine());

  const subscribe = createSubscribe(readTracked);

  return brandReadonly({
    value: () => readTracked() as ReadValue<T>,
    peek: () => readUntracked() as ReadValue<T>,
    subscribe,
  }) as ReadonlySignal<T>;
};
