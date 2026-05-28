import { createParser } from "../core/parser";

const first = (value: string | string[] | null): string | null => {
  if (value === null) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
};

export const parseAsIsoDate = createParser<Date>({
  parse(value) {
    const v = first(value);
    if (v === null) return null;
    const date = new Date(v);
    return Number.isNaN(date.getTime()) ? null : date;
  },
  serialize(value) {
    const t = value.getTime();
    if (Number.isNaN(t)) return null;
    return value.toISOString();
  },
});

