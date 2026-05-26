import type { Store, StoreExtension } from "./types";
import type { ReadonlyStore } from "./types";

export const withActions = <
  State,
  const Actions extends Record<string, (store: Store<State>) => unknown>,
>(
  actions: Actions,
): StoreExtension<
  State,
  { [K in keyof Actions]: ReturnType<Actions[K]> }
> => {
  return (store) => {
    const result = {} as { [K in keyof Actions]: ReturnType<Actions[K]> };
    for (const key of Object.keys(actions) as (keyof Actions)[]) {
      const factory = actions[key];
      if (!factory) continue;
      result[key] = factory(store) as ReturnType<Actions[typeof key]>;
    }
    return result;
  };
};

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

export const toReadonlyStore = <State>(store: Store<State>): ReadonlyStore<State> => {
  const readonlyStore: ReadonlyStore<State> = {
    kind: "readonly-store",
    name: store.name,
    value: () => store.value(),
    $value: store.$value,
    changed: store.changed,
    subscribe: (listener) => store.subscribe(listener),
  };
  return readonlyStore;
};

export const readonly = <State>(store: Store<State>): ReadonlyStore<State> => {
  return toReadonlyStore(store);
};

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
