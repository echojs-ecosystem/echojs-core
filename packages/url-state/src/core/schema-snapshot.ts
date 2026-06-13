import type { ReadValue } from "@echojs-ecosystem/reactivity";

import type { ParsedSchema, Parser } from "./types";

const fieldEqual = <Value>(parser: Parser<Value>, a: Value, b: Value): boolean => {
  if (Object.is(a, b)) return true;
  const eq = parser.eq;
  return eq ? eq(a, b) : false;
};

export const mergeSchemaSnapshot = <Schema extends Record<string, Parser<any>>>(
  schema: Schema,
  prev: ReadValue<ParsedSchema<Schema>>,
  next: ParsedSchema<Schema>,
): ParsedSchema<Schema> => {
  let allSame = true;
  const out: Record<string, unknown> = {};

  for (const key of Object.keys(schema) as (keyof Schema)[]) {
    const parser = schema[key] as Parser<unknown>;
    const nextValue = next[key];
    const prevValue = prev[key];

    if (fieldEqual(parser, nextValue, prevValue)) {
      out[key as string] = prevValue;
    } else {
      out[key as string] = nextValue;
      allSame = false;
    }
  }

  return (allSame ? prev : out) as ParsedSchema<Schema>;
};
