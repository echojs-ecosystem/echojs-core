import { createAlienEffect, type Disposer } from "./internals/alien.js";
import { isFunction } from "./utils";

export const createSubscribe = (readTracked: () => unknown): ((fn: () => void) => Disposer) => {
  return (fn) => {
    if (!isFunction(fn)) {
      throw new TypeError("subscribe(fn) expects a function");
    }

    let inited = false;
    let prev: unknown;

    const stop = createAlienEffect(() => {
      const next = readTracked();

      if (!inited) {
        inited = true;
        prev = next;
        return;
      }

      if (Object.is(prev, next)) return;
      prev = next;
      fn();
    });

    return stop;
  };
};
