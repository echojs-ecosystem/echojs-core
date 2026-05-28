import { createParser } from "../core/parser";

const first = (value: string | string[] | null): string | null => {
  if (value === null) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
};

export const parseAsBoolean = createParser<boolean>({
  parse(value) {
    const v = first(value);
    if (v === null) return null;
    const lowered = v.toLowerCase();
    if (lowered === "true") return true;
    if (lowered === "false") return false;
    if (lowered === "1") return true;
    if (lowered === "0") return false;
    return null;
  },
  serialize(value) {
    return value ? "true" : "false";
  },
});

