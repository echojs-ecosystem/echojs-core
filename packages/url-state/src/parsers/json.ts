import { createCustomParser } from "../core/custom-parser";
import type { JsonSchema } from "../core/standard-schema";
import { validateJsonSchema } from "../core/standard-schema";
import type { SearchParamValue } from "../core/url";

const first = (value: SearchParamValue): string | null => {
  if (value === null) return null;
  if (Array.isArray(value)) return value[0] ?? null;
  return value as string;
};

/**
 * JSON in a single query param. Optional Standard Schema (Zod, Valibot, …) or sync validator.
 *
 * @see https://nuqs.dev/docs/parsers/built-in#json
 */
export const parseAsJson = <T = unknown>(schema?: JsonSchema<T>) =>
  createCustomParser<T>({
    parse(value) {
      const raw = first(value);
      if (raw === null) return null;
      try {
        const data: unknown = JSON.parse(raw);
        return validateJsonSchema(schema, data);
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
