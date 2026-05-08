import type { Form } from "../types";
import type { ArrayPath } from "./array-path";

type AnyRecord = Record<string, any>;

const isPlainObject = (v: unknown): v is AnyRecord => !!v && typeof v === "object" && !Array.isArray(v);

const getFieldArray = (
  node: unknown,
): { $items: { value: () => unknown[] }; removeAt: (index: number) => void } => {
  if (!isPlainObject(node)) throw new Error("generateRemoveFromArray: expected FieldArray node");
  if (!("$items" in node) || typeof (node as any).removeAt !== "function") {
    throw new Error("generateRemoveFromArray: path does not resolve to a FieldArray");
  }
  return node as any;
};

/**
 * Generates a remove function for a nested FieldArray path.
 *
 * `path` is a dot-separated chain of array names, where the last segment is the target array.
 * Example: "departments.employees.tickets" => removeTicket(deptIndex, employeeIndex, ticketIndex)
 *
 * The returned function expects N indices where N = segments.length.
 */
export const generateRemoveFromArray = <TValue, TFields extends Record<string, any>>(
  form: Form<TValue, TFields, any>,
  path: ArrayPath<TFields>,
) => {
  const segments = path.split(".").filter(Boolean);
  if (segments.length === 0) throw new Error("generateRemoveFromArray: empty path");

  return (...indices: number[]): void => {
    if (indices.length !== segments.length) {
      throw new Error(
        `generateRemoveFromArray: expected ${segments.length} indices, got ${indices.length}`,
      );
    }

    let cursor = form.fields;

    for (let index = 0; index < segments.length; index++) {
      const key = segments[index]!;
      const isTarget = index === segments.length - 1;
      const next = cursor?.[key];

      const arr = getFieldArray(next);

      if (isTarget) {
        const removeIndex = indices[index]!;
        arr.removeAt(removeIndex);
        return;
      }

      const parentIndex = indices[index]!;
      const items = arr.$items.value();
      const row = items[parentIndex];
      cursor = row as TFields;
    }
  };
};

