export type ClassDictionary = Record<string, boolean | null | undefined>;
export type ClassValue =
  | string
  | null
  | undefined
  | false
  | ClassDictionary
  | readonly ClassValue[];

/** Optional hook to swap in tailwind-merge later. */
export type ClassNameMerger = (...values: ClassValue[]) => string;

const defaultClassNameMerger: ClassNameMerger = (...values) => {
  const out: string[] = [];

  const walk = (value: ClassValue): void => {
    if (value == null || value === false) return;

    if (typeof value === "string") {
      if (value) out.push(value);
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) walk(item);
      return;
    }

    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) out.push(key);
    }
  };

  for (const value of values) walk(value);
  return out.join(" ");
};

let classNameMerger: ClassNameMerger = defaultClassNameMerger;

/** Replaces the global className merger (e.g. with tailwind-merge). */
export const setClassNameMerger = (merger: ClassNameMerger): void => {
  classNameMerger = merger;
};

/** Resets the className merger to the built-in implementation. */
export const resetClassNameMerger = (): void => {
  classNameMerger = defaultClassNameMerger;
};

/**
 * Joins class name fragments.
 *
 * Supports strings, arrays, conditional maps, and falsy values.
 */
export const cn: ClassNameMerger = (...values) => classNameMerger(...values);
