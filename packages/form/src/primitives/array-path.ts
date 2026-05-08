import type { FieldArray, FieldSet } from "../types";

type StrKey<T> = Extract<keyof T, string>;

type UnwrapFieldSet<T> = T extends FieldSet<infer Shape> ? Shape : T extends { fields: infer F } ? F : T;

type RowShape<T> = T extends FieldArray<infer Row> ? UnwrapFieldSet<Row> : never;

type NextRecord<T> = T extends Record<string, any> ? T : never;

type Join<P extends string, K extends string> = P extends "" ? K : `${P}.${K}`;

type ArrayPathsFromRecord<TRecord, Prefix extends string = ""> =
  TRecord extends Record<string, any>
    ? {
        [K in StrKey<TRecord>]:
          TRecord[K] extends FieldArray<any>
            ? | Join<Prefix, K>
              | ArrayPathsFromRecord<NextRecord<RowShape<TRecord[K]>>, Join<Prefix, K>>
            : never;
      }[StrKey<TRecord>]
    : never;

/**
 * Union of dot-separated paths that resolve to a `FieldArray` inside a field tree.
 *
 * Example: `"departments" | "departments.employees" | "departments.employees.tickets"`.
 */
export type ArrayPath<TFields extends Record<string, any>> = ArrayPathsFromRecord<TFields>;

