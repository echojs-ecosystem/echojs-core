import type { Form } from "../types";
import type { ArrayPath } from "./array-path";

type AnyRecord = Record<string, any>;

const isPlainObject = (v: unknown): v is AnyRecord => !!v && typeof v === "object" && !Array.isArray(v);

const getFieldArray = (node: unknown): { $items: { value: () => unknown[] }; append: (item: unknown) => void } => {
  if (!isPlainObject(node)) throw new Error("generateAppendToArray: expected FieldArray node");
  if (!("$items" in node) || typeof (node as any).append !== "function") {
    throw new Error("generateAppendToArray: path does not resolve to a FieldArray");
  }
  return node as any;
};

/**
 * Generates an append function for a nested FieldArray path.
 *
 * `path` is a dot-separated chain of array names, where the last segment is the target array.
 * Example: "departments.employees.tickets" => appendTicket(deptIndex, employeeIndex)
 *
 * The returned function expects N indices where N = segments.length - 1.
 */
export const generateAppendToArray = <TValue, TFields extends Record<string, any>, Row>(
  form: Form<TValue, TFields, any>,
  makeRow: () => Row,
  path: ArrayPath<TFields>,
) => {
  const segments = path.split(".").filter(Boolean);
  if (segments.length === 0) throw new Error("generateAppendToArray: empty path");

  return (...indices: number[]): void => {
    if (indices.length !== Math.max(0, segments.length - 1)) {
      throw new Error(
        `generateAppendToArray: expected ${Math.max(0, segments.length - 1)} indices, got ${indices.length}`,
      );
    }

    let cursor: any = form.fields;

    for (let index = 0; index < segments.length; index++) {
      const key = segments[index]!;
      const isTarget = index === segments.length - 1;

      const next = cursor?.[key];
      if (isTarget) {
        getFieldArray(next).append(makeRow());
        return;
      }

      const arr = getFieldArray(next);
      const idx = indices[index]!;
      const items = arr.$items.value();
      const row = items[idx];
      cursor = row;
    }
  };
};

