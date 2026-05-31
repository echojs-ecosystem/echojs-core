import type { ReadonlyStore, Store } from "./types";

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
