import { cleanup, effect as runReactiveEffect, untrack } from "@echojs-ecosystem/reactivity";

import { assertModelContext, registerCleanup } from "../model/assert-model-context";

export type ModelLifecycleCleanup = void | (() => void);

export type WatchOptions = {
  /** Run the callback immediately with the current value. */
  immediate?: boolean;
};

export type WatchCallback<T> = (value: T, previous: T | undefined) => ModelLifecycleCleanup;

export type WatchSource<T> = () => T;

const runMount = (fn: () => ModelLifecycleCleanup): void => {
  assertModelContext("effect.mount");
  registerCleanup(fn());
};

const runUnmount = (fn: () => void): void => {
  assertModelContext("effect.unmount");
  cleanup(fn);
};

const runWatchEffect = (fn: () => ModelLifecycleCleanup): (() => void) => {
  assertModelContext("effect");

  let onInvalidate: (() => void) | undefined;

  const stop = runReactiveEffect(() => {
    if (onInvalidate) {
      onInvalidate();
      onInvalidate = undefined;
    }

    const cleanupFn = fn();
    if (typeof cleanupFn === "function") {
      onInvalidate = cleanupFn;
    }
  });

  cleanup(() => {
    stop();
    onInvalidate?.();
  });

  return stop;
};

const runWatch = <T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions,
): (() => void) => {
  assertModelContext("effect.watch");

  let previous: T | undefined;
  let onInvalidate: (() => void) | undefined;
  let initialized = false;

  const invoke = (value: T, prev: T | undefined): void => {
    if (onInvalidate) {
      onInvalidate();
      onInvalidate = undefined;
    }

    const cleanupFn = callback(value, prev);
    if (typeof cleanupFn === "function") {
      onInvalidate = cleanupFn;
    }
  };

  if (options?.immediate) {
    const initial = untrack(source);
    invoke(initial, undefined);
    previous = initial;
    initialized = true;
  }

  const stop = runReactiveEffect(() => {
    const value = source();
    if (!initialized) {
      initialized = true;
      previous = value;
      return;
    }

    if (Object.is(value, previous)) return;

    const prev = previous;
    previous = value;
    invoke(value, prev);
  });

  cleanup(() => {
    stop();
    onInvalidate?.();
  });

  return stop;
};

/**
 * Model-scoped reactive effect (default — tracks signals read inside `fn`).
 *
 * Only valid inside `createModel(...)` mounted via `createComponent(model, view)()`.
 * For low-level effects outside models use `@echojs-ecosystem/reactivity`.
 */
export interface ModelEffect {
  (fn: () => ModelLifecycleCleanup): () => void;
  /** Runs once when the model is created. Returned cleanup runs on model dispose. */
  mount(fn: () => ModelLifecycleCleanup): void;
  /** Runs only when the model scope is disposed. */
  unmount(fn: () => void): void;
  /** Watches an explicit reactive source; callback receives `(value, previous)`. */
  watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions,
  ): () => void;
  /** Alias for {@link ModelEffect.watch}. */
  source<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions,
  ): () => void;
}

export const effect = Object.assign(runWatchEffect, {
  mount: runMount,
  unmount: runUnmount,
  watch: runWatch,
  source: runWatch,
});