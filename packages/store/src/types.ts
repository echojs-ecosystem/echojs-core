import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";

export type EqualsFn<T> = (a: T, b: T) => boolean;

export type EqualsOption<T> = false | EqualsFn<T>;

export type StoreOptions<State> = {
  name?: string;
  equals?: EqualsOption<State>;
};

export type StoreEventPayload<State> = {
  value: State;
  prevValue: State;
};

export type StoreEvent<Payload> = {
  watch(listener: (payload: Payload) => void): () => void;
  emit(payload: Payload): void;
};

export type StoreExtension<State, Result extends object> = (store: Store<State>) => Result;

export type ExtensionResult<Ext> = Ext extends StoreExtension<any, infer Result> ? Result : never;

export type Store<State> = {
  kind: "store";
  name?: string;

  value(): State;
  set(value: State): void;
  update(updater: (value: State) => State): void;
  reset(): void;

  $value: Signal<State>;

  changed: StoreEvent<StoreEventPayload<State>>;
  reseted: StoreEvent<StoreEventPayload<State>>;

  subscribe(listener: (value: State, prevValue: State) => void): () => void;

  extend<Ext extends StoreExtension<State, any>>(
    extension: Ext,
  ): Store<State> & ExtensionResult<Ext>;
};

export type ReadonlyStore<State> = {
  kind: "readonly-store";
  name?: string;

  value(): State;
  $value: ReadonlySignal<State>;

  changed: StoreEvent<StoreEventPayload<State>>;

  subscribe(listener: (value: State, prevValue: State) => void): () => void;
};

export type SourceValues<Sources> = {
  [K in keyof Sources]: Sources[K] extends Store<infer V>
    ? V
    : Sources[K] extends ReadonlyStore<infer V>
      ? V
      : never;
};

export type CombineOptions<Result> = {
  name?: string;
  equals?: EqualsOption<Result>;
};

export type SelectOptions<Selected> = {
  name?: string;
  equals?: EqualsOption<Selected>;
};
