import type { Form } from "../types";
import type { ArrayPath } from "./array-path";
import { generateAppendToArray } from "./generate-append-to-array";
import { generateRemoveFromArray } from "./generate-remove-from-array";

/** Утилиты для append/remove по вложенным `FieldArray` (пути — `ArrayPath`). */
export const arrayGenerator = {
  append<TValue, TFields extends Record<string, any>, Row>(
    form: Form<TValue, TFields, any>,
    makeRow: () => Row,
    path: ArrayPath<TFields>,
  ) {
    return generateAppendToArray(form, makeRow, path);
  },

  remove<TValue, TFields extends Record<string, any>>(form: Form<TValue, TFields, any>, path: ArrayPath<TFields>) {
    return generateRemoveFromArray(form, path);
  },
};
