import type { FieldSet } from "../types";

/**
 * Groups fields (or nested fieldSets) into a single unit.
 *
 * This version is intentionally simple: it calls `validate()`/`reset()` on children when present.
 */
export const createFieldSet = <Shape extends Record<string, any>>(
  fields: Shape,
): FieldSet<Shape> => {
  const validate = (): Record<string, string[]> => {
    const out: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value && typeof value.validate === "function") {
        out[key] = value.validate();
      }
    }
    return out;
  };

  const reset = (): void => {
    for (const value of Object.values(fields)) {
      if (value && typeof value.reset === "function") {
        value.reset();
      }
    }
  };

  return { fields, validate, reset };
};
