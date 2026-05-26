import { signal } from "@echojs-ecosystem/reactivity";
import {
  applyStoreUpdate,
  attachExtend,
  createStoreInternals,
} from "./store";
import type { Store, StoreOptions } from "./types";

export const createStore = <State>(
  initialState: State,
  options?: StoreOptions<State>,
): Store<State> => {
  const internals = createStoreInternals(initialState, options?.equals);
  const $value = signal(initialState);

  const store: Store<State> = {
    kind: "store",
    name: options?.name,
    $value,
    changed: internals.changed,
    reseted: internals.reseted,

    value() {
      return $value.value() as State;
    },

    set(value) {
      applyStoreUpdate(internals, $value, value);
    },

    update(updater) {
      const prev = $value.peek() as State;
      applyStoreUpdate(internals, $value, updater(prev));
    },

    reset() {
      const prev = $value.peek() as State;
      const next = internals.initialState;
      internals.reseted.emit({ value: next, prevValue: prev });
      applyStoreUpdate(internals, $value, next);
    },

    subscribe(listener) {
      internals.listeners.add(listener);
      return () => {
        internals.listeners.delete(listener);
      };
    },

    extend() {
      throw new Error("extend() is not initialized");
    },
  };

  attachExtend(store);
  return store;
};
