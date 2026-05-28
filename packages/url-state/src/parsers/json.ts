import { createParser } from "../core/parser";

const first = (value: string | string[] | null): string | null => {
  if (value === null) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
};

export const parseAsJson = <T = unknown>() => {
  return createParser<T>({
    parse(value) {
      const v = first(value);
      if (v === null) return null;
      try {
        return JSON.parse(v) as T;
      } catch {
        return null;
      }
    },
    serialize(value) {
      try {
        return JSON.stringify(value);
      } catch {
        return null;
      }
    },
  });
};

