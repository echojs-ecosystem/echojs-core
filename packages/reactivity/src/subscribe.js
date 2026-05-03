import { createAlienEffect } from "./internals/alien";
import { isFunction } from "./utils";
export const createSubscribe = (readTracked) => {
  return (fn) => {
    if (!isFunction(fn)) {
      throw new TypeError("subscribe(fn) expects a function");
    }
    let inited = false;
    let prev;
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
//# sourceMappingURL=subscribe.js.map
