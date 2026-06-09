import type { ReadonlySignal } from "@echojs-ecosystem/reactivity";

import type { MaybeSignalOrGetter } from "./types";

const isReadonlySignal = <T>(value: unknown): value is ReadonlySignal<T> => {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    typeof (value as ReadonlySignal<T>).value === "function"
  );
};

/** Resolves a plain value, getter, or signal to its current value. */
export const toValue = <T>(source: MaybeSignalOrGetter<T>): T => {
  if (typeof source === "function") {
    return (source as () => T)();
  }
  if (isReadonlySignal<T>(source)) {
    return source.value() as T;
  }
  return source;
};
