import type { ReadValue, Signal } from "@echojs-ecosystem/reactivity";

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

export type FieldAccessor<TValue> = {
  /** Reactive read shortcut: `accessor.value()` delegates to signals. */
  value: () => ReadValue<TValue>;
  meta: () => FieldMeta;

  /** Same as underlying `createField()` `set()`, but ergonomically spelled for bindings. */
  set: (next: TValue) => void;
  reset: (next?: TValue) => void;

  /** Mirrors common DOM lifecycle hooks (`on:input`, `on:change`, `on:focus`, `on:blur`). */
  handlers: FieldBinding;

  validate: () => string[];
  validateAsync: () => Promise<string[]>;
  clearErrors: () => void;
};

export type FieldTreeWire<TTree> =
  TTree extends Field<infer TValue>
    ? FieldAccessor<TValue>
    : TTree extends FieldSet<infer Shape>
      ? { fields: { [K in keyof Shape]: FieldTreeWire<Shape[K]> } }
      : TTree extends FieldArray<infer Item>
        ? FieldArray<Item>
        : TTree extends Record<string, unknown>
          ? { [K in keyof TTree]: FieldTreeWire<TTree[K]> }
          : never;

export type WireFormModel<TTree> = FieldTreeWire<TTree> & {
  /**
   * Rebuild accessors after inserting/removing array items whose models are keyed by index.
   * (Use stable ids + Map models if possible; `reindex` is escape hatch.)
   */
  reindex?: () => void;
};

export type Field<T> = {
  $value: Signal<T>;
  $meta: Signal<FieldMeta>;

  set: (next: T) => void;
  reset: (next?: T) => void;

  focus: () => void;
  blur: () => void;
  touch: () => void;

  bind: () => FieldBinding;

  validate: () => string[];
  validateAsync: () => Promise<string[]>;
  clearErrors: () => void;
};

export type FieldArray<Item> = {
  $items: Signal<Item[]>;

  append: (item: Item) => void;
  prepend: (item: Item) => void;
  removeAt: (index: number) => void;
  move: (from: number, to: number) => void;
  updateAt: (index: number, fn: (prev: Item) => Item) => void;
  replace: (next: Item[]) => void;
  reset: () => void;
};

export type FieldSet<Shape extends Record<string, any>> = {
  fields: Shape;
  validate: () => Record<string, string[]>;
  reset: () => void;
};

export type FormSubmitResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Record<string, unknown> };

export type Form<TValue, TFields extends Record<string, any>> = {
  fields: TFields;

  $submitting: Signal<boolean>;
  $submitCount: Signal<number>;

  validate: () => Record<string, unknown>;
  validateAsync: () => Promise<Record<string, unknown>>;
  reset: () => void;

  /** Подмешать значения после создания формы (тот же формат, что у `defaultAsyncValues`). */
  hydrate: (partial: Partial<TValue>) => void;

  getValue: () => TValue;
  submit: (handler: (value: TValue) => void | Promise<void>) => Promise<FormSubmitResult<TValue>>;
};
