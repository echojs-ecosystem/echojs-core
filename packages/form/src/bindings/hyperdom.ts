import type { Field, FieldBinding } from "../types";

/** Поле формы для Hyperdom (`createField` / `form.fields.*`). */
export type HyperdomFormFieldRef<T> = Field<T>;

type BindFieldEvent = Event & {
  currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
};

const isBindFieldEvent = (value: unknown): value is BindFieldEvent =>
  typeof value === "object" &&
  value !== null &&
  "currentTarget" in value &&
  (value as BindFieldEvent).currentTarget != null;

const fieldError = <T>(field: Field<T>): string | undefined => field.meta().errors[0];

const formatDisplayValue = <T>(value: T): string => {
  if (value == null) return "";
  if (typeof value === "number" && Number.isNaN(value)) return "";
  return String(value);
};

const readEventValue = <T>(field: Field<T>, event: BindFieldEvent): T => {
  const el = event.currentTarget;
  if (typeof field.value() === "boolean") {
    return (el as HTMLInputElement).checked as T;
  }
  if (typeof field.value() === "number") {
    const n = Number.parseFloat(el.value);
    return (Number.isFinite(n) ? n : 0) as T;
  }
  return el.value as T;
};

const commitFieldValue = <T>(field: Field<T>, next: unknown): void => {
  if (isBindFieldEvent(next)) {
    field.set(readEventValue(field, next));
    return;
  }
  field.set(next as T);
};

type BindFieldHandlers = Pick<FieldBinding, "onFocus" | "onBlur">;

export type BindFieldBase = BindFieldHandlers & {
  error: () => string | undefined;
};

/** Checkbox / boolean fields — `checked` + `onChange`. */
export type BindFieldBooleanResult = BindFieldBase & {
  checked: () => boolean;
  onChange: (value: boolean | BindFieldEvent) => void;
};

/** Text, number, select, textarea — controlled `value` + `onInput` / `onChange`. */
export type BindFieldValueResult<T> = BindFieldBase & {
  value: () => string;
  onInput: (value: T | BindFieldEvent) => void;
  onChange: (value: T | BindFieldEvent) => void;
};

export type BindFieldResult<T> = T extends boolean
  ? BindFieldBooleanResult
  : BindFieldValueResult<T>;

const bindBooleanField = <T extends boolean>(field: Field<T>): BindFieldBooleanResult => {
  const { onFocus, onBlur } = field.handlers;

  return {
    checked: () => Boolean(field.value()),
    onChange: (value) => commitFieldValue(field, value),
    onFocus,
    onBlur,
    error: () => fieldError(field),
  };
};

const bindValueField = <T>(field: Field<T>): BindFieldValueResult<T> => {
  const { onFocus, onBlur } = field.handlers;

  return {
    value: () => formatDisplayValue(field.value()),
    onInput: (value) => commitFieldValue(field, value),
    onChange: (value) => commitFieldValue(field, value),
    onFocus,
    onBlur,
    error: () => fieldError(field),
  };
};

/**
 * Биндинг поля `@echojs-ecosystem/form` к Hyperdom-контролам.
 *
 * Поведение выводится из **типа значения поля** — `variant` не нужен:
 *
 * - `Field<boolean>` → `checked` + `onChange` (добавьте `type: "checkbox"` на `input`)
 * - `Field<number>` → парсит число из DOM; `value` как строка для controlled-рендера
 * - остальное → `value` + `onInput` / `onChange`
 *
 * Атрибуты вроде `type`, `min`, `max`, `step`, `placeholder` задавайте на самом
 * элементе (`input`, `textarea`, `select`).
 *
 * `onChange` / `onInput` принимают DOM-событие или значение напрямую:
 * `onChange('draft')`, `onChange(false)`.
 *
 * Всегда controlled — `value` / `checked` это реактивные функции, безопасно внутри `List`.
 */
export function bindField<T extends boolean>(field: HyperdomFormFieldRef<T>): BindFieldBooleanResult;
export function bindField<T>(field: HyperdomFormFieldRef<T>): BindFieldValueResult<T>;
export function bindField<T>(
  field: HyperdomFormFieldRef<T>,
): BindFieldBooleanResult | BindFieldValueResult<T> {
  if (typeof field.value() === "boolean") {
    return bindBooleanField(field as unknown as Field<boolean>);
  }
  return bindValueField(field);
}
