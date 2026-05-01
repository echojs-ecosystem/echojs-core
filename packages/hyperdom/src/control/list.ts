import type { Child } from "../types";

type SignalLike<T> = { value(): T };

/** Reads an array from either a signal-like source or a getter function. */
const readSource = <T>(source: SignalLike<readonly T[]> | (() => readonly T[])): readonly T[] => {
  if (typeof source === "function") return source();
  return source.value();
};

/**
 * List rendering helper.
 *
 * Returns a function so the list can be used as a dynamic child and re-evaluated when reactive
 * dependencies change.
 */
export const List = <T>(
  source: SignalLike<readonly T[]> | (() => readonly T[]),
  renderItem: (item: T, index: () => number) => Child,
): (() => Child) => {
  return () => {
    const arr = readSource(source);
    return arr.map((item, i) => renderItem(item, () => i));
  };
};
