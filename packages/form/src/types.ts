import type { ReadValue, Signal } from "@echojs-ecosystem/reactivity";
import type { FieldArrayPersistMethods, FieldPersistMethods } from "./primitives/field-persist";

export type FieldValidator<T> = (value: ReadValue<T>) => string | null;

export type StandardSchemaLike<T = unknown> = {
  "~standard": {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (value: unknown) =>
      | {
          readonly value: T;
          readonly issues?: undefined;
        }
      | {
          readonly issues: ReadonlyArray<{
            readonly message: string;
            readonly path?: ReadonlyArray<unknown>;
          }>;
        }
      | Promise<
          | {
              readonly value: T;
              readonly issues?: undefined;
            }
          | {
              readonly issues: ReadonlyArray<{
                readonly message: string;
                readonly path?: ReadonlyArray<unknown>;
              }>;
            }
        >;
  };
};

export type StandardSchemaIssue = {
  message: string;
  path?: readonly (string | number | symbol)[];
};

export type FieldMeta = {
  dirty: boolean;
  touched: boolean;
  focused: boolean;
  errors: readonly string[];
};

export type FieldBinding = {
  /** Text-like inputs: update value on input/change without forcing controlled `value:` on every render. */
  onInputText: (e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void;
  onChangeText: (e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export type FieldValidationMode = "manual" | "onChange" | "onBlur";

export type FormValidationMode = "manual" | "onChange" | "onBlur" | "onFocus" | "all";

export type FieldCore<T> = {
  $value: Signal<T>;
  $meta: Signal<FieldMeta>;

  /** Shortcut for `$value.value()` — use in views and `bindField`. */
  value: () => ReadValue<T>;
  /** Shortcut for `$meta.value()`. */
  meta: () => FieldMeta;
  /** Same handlers as `bind()` — for Hyperdom `bindField` and custom inputs. */
  handlers: FieldBinding;

  set: (next: T) => void;
  reset: (next?: T) => void;

  focus: () => void;
  blur: () => void;
  touch: () => void;

  /** @deprecated Prefer `.handlers` — kept for backward compatibility. */
  bind: () => FieldBinding;

  validate: () => string[];
  validateAsync: () => Promise<string[]>;
  clearErrors: () => void;
};

export type Field<T> = FieldCore<T> & FieldPersistMethods<T>;

export type FieldArrayCore<Item> = {
  $items: Signal<Item[]>;

  append: (item: Item) => void;
  prepend: (item: Item) => void;
  removeAt: (index: number) => void;
  move: (from: number, to: number) => void;
  updateAt: (index: number, fn: (prev: Item) => Item) => void;
  replace: (next: Item[]) => void;
  reset: () => void;
};

export type FieldArray<Item> = FieldArrayCore<Item> & FieldArrayPersistMethods<Item>;

/** Операции над вложенными `FieldArray`, см. `defineNestedFieldArrayOps`. */
export type NestedFieldArrayOps<Row extends Record<string, unknown> = Record<string, unknown>> = {
  append: (item?: Row) => void;
  removeAt: (index: number) => void;
  remove: (index: number) => void;
  at: (index: number) => Record<string, NestedFieldArrayOps> | undefined;
};

export type FieldSet<Shape extends Record<string, any>> = {
  fields: Shape;
  validate: () => Record<string, string[]>;
  reset: () => void;
};

export type FormSubmitResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Record<string, unknown> };

export type Form<
  TValue,
  TFields extends Record<string, any>,
  TArrayActions extends Record<string, unknown> = {},
> = {
  /** Имя формы из `createForm(fields, { name, ... })`. */
  displayName: string;
  fields: TFields;

  $submitting: Signal<boolean>;
  $submitCount: Signal<number>;
  $errors: Signal<Record<string, unknown> | undefined>;
  $schemaErrors: Signal<Record<string, string[]> | undefined>;
  /** Фабрики строк и append/remove, объявленные в `createForm({ arrayActions })`. */
  arrayActions: TArrayActions;

  validate: () => Record<string, unknown>;
  validateAsync: () => Promise<Record<string, unknown>>;
  reset: () => void;

  /** Подмешать значения после создания формы (тот же формат, что у `defaultAsyncValues`). */
  hydrate: (partial: Partial<TValue>) => void;

  submit: (handler: (value: TValue) => void | Promise<void>) => Promise<FormSubmitResult<TValue>>;
};
