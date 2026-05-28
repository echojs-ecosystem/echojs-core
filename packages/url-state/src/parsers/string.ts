import { createParser } from "../core/parser";

const first = (value: string | string[] | null): string | null => {
  if (value === null) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
};

export const parseAsString = createParser<string>({
  parse(value) {
    const v = first(value);
    if (v === null) return null;
    return v;
  },
  serialize(value) {
    return value;
  },
});

