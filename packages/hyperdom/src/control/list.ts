import type { Child } from "../types";

type SignalLike<T> = { value(): T };

function readSource<T>(source: SignalLike<readonly T[]> | (() => readonly T[])): readonly T[] {
  if (typeof source === "function") return source();
  return source.value();
}

export function List<T>(
  source: SignalLike<readonly T[]> | (() => readonly T[]),
  renderItem: (item: T, index: () => number) => Child,
): () => Child {
  return () => {
    const arr = readSource(source);
    return arr.map((item, i) => renderItem(item, () => i));
  };
}

