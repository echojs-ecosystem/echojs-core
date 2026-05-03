import type { FieldSet } from "../types";

/**
 * Groups fields (or nested fieldSets) into a single unit.
 *
 * This version is intentionally simple: it calls `validate()`/`reset()` on children when present.
 */
export const createFieldSet = <Shape extends Record<string, any>>(fields: Shape): FieldSet<Shape> => {
  const validate = (): Record<string, string[]> => {
    const out: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(fields)) {
      if (v && typeof v.validate === "function") {
        out[k] = v.validate();
      }
    }
    return out;
  };

  const reset = (): void => {
    for (const v of Object.values(fields)) {
      if (v && typeof v.reset === "function") v.reset();
    }
  };

  return { fields, validate, reset };
};

