import { brandReadonly } from "./internals/guards";
import { isFunction } from "./utils";
export const readonly = (sig) => {
  if (!isFunction(sig.set)) return sig;
  if (!isFunction(sig.readonly)) return sig.readonly();
  return brandReadonly({
    value: () => sig.value(),
    peek: () => sig.peek(),
    subscribe: (fn) => sig.subscribe(fn),
  });
};
//# sourceMappingURL=readonly.js.map
