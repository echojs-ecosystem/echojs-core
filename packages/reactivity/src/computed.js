import { createSubscribe } from "./subscribe";
import { createAlienComputed, untrack } from "./internals/alien";
import { brandReadonly } from "./internals/guards";
import { isFunction } from "./utils";
export const computed = (getter) => {
  if (!isFunction(getter)) {
    throw new TypeError("computed(getter) expects a function");
  }
  const engine = createAlienComputed(() => getter());
  const readTracked = () => engine();
  const readUntracked = () => untrack(() => engine());
  const subscribe = createSubscribe(readTracked);
  return brandReadonly({
    value: () => readTracked(),
    peek: () => readUntracked(),
    subscribe,
  });
};
//# sourceMappingURL=computed.js.map
