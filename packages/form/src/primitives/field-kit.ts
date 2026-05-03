import { createField } from "./field";
import { createFieldArray } from "./fieldArray";
import type {
  Field,
  FieldArray,
  FieldValidator,
  FieldValidationMode,
  StandardSchemaLike,
} from "../types";
import type { ZodEnum } from "zod";

export type FieldKitFieldOpts<T> = {
  validationMode?: FieldValidationMode;
  parseDOMValue?: (raw: string) => T;
  parseDOMChecked?: (checked: boolean) => T;
  validate?: FieldValidator<T>[];
  schemaIssuePrefix?: string;
};

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const asRecord = (v: object): Record<string, unknown> => v as Record<string, unknown>;

/**
 * Helpers to build fields from `defaultValues` / `defaultAsyncValues` without repeating
 * `seed.foo ?? ""` for every key. Pass as the second argument to the `fields` factory.
 */
export type FieldKit<TSeed extends Record<string, unknown>> = {
  str: (
    key: string,
    schema: StandardSchemaLike<string>,
    parent?: object,
    extra?: FieldKitFieldOpts<string>,
  ) => Field<string>;
  num: (
    key: string,
    schema: StandardSchemaLike<number>,
    parent?: object,
    extra?: FieldKitFieldOpts<number>,
  ) => Field<number>;
  bool: (
    key: string,
    schema: StandardSchemaLike<boolean>,
    parent?: object,
    extra?: FieldKitFieldOpts<boolean>,
  ) => Field<boolean>;
  /**
   * `z.enum` / string union fields: reads `parent[key]` when it matches an enum option, else `fallback`.
   */
  pick: <T extends string>(
    key: string,
    schema: ZodEnum<[T, ...T[]]>,
    parent: object | undefined,
    fallback: T,
    extra?: FieldKitFieldOpts<T>,
  ) => Field<T>;
  list: <Row>(
    key: string,
    rowFactory: (rowSeed: Record<string, unknown>, index: number) => Row,
    parent?: object,
  ) => FieldArray<Row>;
};

export const createFieldKit = <TSeed extends Record<string, unknown>>(
  seed: TSeed,
): FieldKit<TSeed> => {
  const str: FieldKit<TSeed>["str"] = (key, schema, parent, extra) => {
    const src = asRecord((parent ?? seed) as object);
    const raw = src[key];
    const initial = String(raw ?? "");
    return createField(initial, { schema, ...extra });
  };

  const num: FieldKit<TSeed>["num"] = (key, schema, parent, extra) => {
    const src = asRecord((parent ?? seed) as object);
    const raw = src[key];
    const n = typeof raw === "number" ? raw : Number.parseFloat(String(raw));
    const initial = Number.isFinite(n) ? n : 0;
    return createField(initial, { schema, ...extra });
  };

  const bool: FieldKit<TSeed>["bool"] = (key, schema, parent, extra) => {
    const src = asRecord((parent ?? seed) as object);
    const raw = src[key];
    const initial = Boolean(raw);
    return createField(initial, { schema, ...extra });
  };

  function pick<T extends string>(
    key: string,
    schema: ZodEnum<[T, ...T[]]>,
    parent: object | undefined,
    fallback: T,
    extra?: FieldKitFieldOpts<T>,
  ): Field<T> {
    const src = asRecord((parent ?? seed) as object);
    const raw = src[key];
    const options = schema.options as readonly T[];
    const initial = (
      typeof raw === "string" && (options as readonly string[]).includes(raw) ? (raw as T) : fallback
    ) as T;
    return createField(initial, { schema: schema as StandardSchemaLike<T>, ...extra });
  }

  const list: FieldKit<TSeed>["list"] = (key, rowFactory, parent) => {
    const src = asRecord((parent ?? seed) as object);
    const raw = src[key];
    const arr = Array.isArray(raw) ? raw : [];
    return createFieldArray(
      arr.map((item, index) =>
        rowFactory(isPlainObject(item) ? item : {}, index),
      ),
    );
  };

  return { str, num, bool, pick, list };
};
