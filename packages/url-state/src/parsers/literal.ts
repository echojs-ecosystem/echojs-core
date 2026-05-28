import { createParser } from "../core/parser";

const first = (value: string | string[] | null): string | null => {
  if (value === null) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
};

export const parseAsLiteral = <const Values extends readonly (string | number)[]>(values: Values) => {
  const allowed = new Set(values.map((v) => String(v)));
  return createParser<Values[number]>({
    parse(value) {
      const v = first(value);
      if (v === null) return null;
      if (!allowed.has(v)) return null;
      return values.find((item) => String(item) === v) ?? null;
    },
    serialize(value) {
      return String(value);
    },
  });
};

export const parseAsStringLiteral = <const Values extends readonly string[]>(values: Values) => parseAsLiteral(values);

export const parseAsNumberLiteral = <const Values extends readonly number[]>(values: Values) => parseAsLiteral(values);
