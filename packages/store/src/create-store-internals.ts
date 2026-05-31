import { createStoreEvent } from "./create-store-event";
import { resolveEquals } from "./resolve-equals";
import type { EqualsFn, EqualsOption, StoreEvent, StoreEventPayload } from "./types";

export type StoreInternals<State> = {
  initialState: State;
  equals: EqualsFn<State>;
  changed: StoreEvent<StoreEventPayload<State>>;
  reseted: StoreEvent<StoreEventPayload<State>>;
  listeners: Set<(value: State, prevValue: State) => void>;
  notifyChanged(value: State, prevValue: State): void;
};

export const createStoreInternals = <State>(
  initialState: State,
  equalsOption?: EqualsOption<State>,
): StoreInternals<State> => {
  const equals = resolveEquals(equalsOption);
  const changed = createStoreEvent<StoreEventPayload<State>>();
  const reseted = createStoreEvent<StoreEventPayload<State>>();
  const listeners = new Set<(value: State, prevValue: State) => void>();

  const notifyChanged = (value: State, prevValue: State) => {
    changed.emit({ value, prevValue });
    for (const listener of listeners) {
      listener(value, prevValue);
    }
  };

  return {
    initialState,
    equals,
    changed,
    reseted,
    listeners,
    notifyChanged,
  };
};
