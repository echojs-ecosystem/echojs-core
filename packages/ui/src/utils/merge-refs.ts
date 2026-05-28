export type RefCallback<T> = (instance: T | null) => void;
export type RefValue<T> = RefCallback<T> | null | undefined;

/**
 * Merges multiple ref callbacks into one.
 */
export const mergeRefs =
  <T>(...refs: RefValue<T>[]): RefCallback<T> | undefined => {
    const filtered = refs.filter(Boolean) as RefCallback<T>[];
    if (filtered.length === 0) return undefined;
    if (filtered.length === 1) return filtered[0];

    return (instance) => {
      for (const ref of filtered) ref(instance);
    };
  };
