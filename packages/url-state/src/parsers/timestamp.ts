import { createParser } from "../core/parser";

const first = (value: string | string[] | null): string | null => {
  if (value === null) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
};

export const parseAsTimestamp = createParser<number>({
  parse(value) {
    const v = first(value);
    if (v === null) return null;
    if (!/^[+-]?\d+(\.\d+)?$/.test(v)) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  },
  serialize(value) {
    if (!Number.isFinite(value)) return null;
    return String(value);
  },
});
