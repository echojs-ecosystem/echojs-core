import type { StoreExtension } from "./types";

export type WithDebugResult = {
  debugName?: string;
};

export const withDebug = <State>(): StoreExtension<State, WithDebugResult> => {
  return (store) => {
    const debugName = store.name ?? "anonymous";

    store.changed.watch(({ value, prevValue }) => {
      if (typeof console !== "undefined" && typeof console.log === "function") {
        console.log(`[store:${debugName}]`, { prevValue, value });
      }
    });

    return { debugName };
  };
};
