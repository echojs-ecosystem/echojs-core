import type { StoreExtension } from "./types";

export const withReadonly = <State>(): StoreExtension<State, Record<string, never>> => {
  return (store) => {
    const mutating = ["set", "update", "reset"] as const;
    for (const key of mutating) {
      if (key in store) {
        (store as Record<string, unknown>)[key] = () => {
          throw new Error(`Store is readonly: cannot call ${key}()`);
        };
      }
    }
    (store as { kind: string }).kind = "readonly-store";
    return {};
  };
};
