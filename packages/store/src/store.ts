import { signal } from "@echojs-ecosystem/reactivity";
import { createStoreEvent } from "./event";
import type {
  EqualsFn,
  EqualsOption,
  Store,
  StoreEvent,
  StoreEventPayload,
  StoreExtension,
} from "./types";

export const resolveEquals = <T>(equals?: EqualsOption<T>): EqualsFn<T> => {
  if (equals === false) {
    return () => false;
  }
  if (equals) {
    return equals;
  }
  return Object.is;
};

const STORE_RESERVED_KEYS = new Set([
  "kind",
  "name",
  "value",
  "set",
  "update",
  "reset",
  "$value",
  "changed",
  "reseted",
  "subscribe",
  "extend",
]);

export const assertExtensionKeys = (store: object, extension: object): void => {
  for (const key of Object.keys(extension)) {
    if (STORE_RESERVED_KEYS.has(key) || key in store) {
      throw new Error(`Store extension conflict: key "${key}" already exists`);
    }
  }
};

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

export const applyStoreUpdate = <State>(
  internals: StoreInternals<State>,
  $value: ReturnType<typeof signal<State>>,
  next: State,
): void => {
  const prev = $value.peek() as State;
  if (internals.equals(prev, next)) {
    return;
  }
  $value.set(next);
  internals.notifyChanged(next, prev);
};

export const attachExtend = <State>(store: Store<State>): void => {
  store.extend = <Ext extends StoreExtension<State, any>>(extension: Ext) => {
    const extensionResult = extension(store);
    assertExtensionKeys(store, extensionResult);
    Object.assign(store, extensionResult);
    return store as Store<State> & import("./types").ExtensionResult<Ext>;
  };
};
