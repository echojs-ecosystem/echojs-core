import type { Field, FieldBinding } from "../types";

/** Поле формы для Hyperdom (`createField` / `form.fields.*`). */
export type HyperdomFormFieldRef<T> = Field<T>;

const getBinding = <T>(field: HyperdomFormFieldRef<T>): FieldBinding => field.handlers;

const readFieldRef = <T>(field: HyperdomFormFieldRef<T>): T => field.value() as T;

const writeFieldRef = <T>(field: HyperdomFormFieldRef<T>, next: T): void => {
  field.set(next);
};

const parseNumericInput = (raw: string): number => {
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
};

const controlledStringValue = <T>(field: HyperdomFormFieldRef<T>): (() => string) => {
  return () => {
    const v = readFieldRef(field);
    if (v == null) return "";
    return String(v);
  };
};

type InvalidNumberDisplay = "empty" | "zero";

const controlledNumericStringValue = <T>(
  field: HyperdomFormFieldRef<T>,
  whenInvalid: InvalidNumberDisplay,
): (() => string) => {
  return () => {
    const v = readFieldRef(field);
    if (v == null || (typeof v === "number" && Number.isNaN(v))) {
      return whenInvalid === "empty" ? "" : "0";
    }
    return String(v);
  };
};

const textLikeHandlers = (b: FieldBinding) =>
  ({
    onInput: b.onInputText,
    onChange: b.onChangeText,
    onFocus: b.onFocus,
    onBlur: b.onBlur,
  }) as const;

const domNumericInputHandlers = <T>(field: HyperdomFormFieldRef<T>) => {
  const sync = (e: Event & { currentTarget: HTMLInputElement }): void => {
    writeFieldRef(field, parseNumericInput(e.currentTarget.value) as unknown as T);
  };
  return { onInput: sync, onChange: sync } as const;
};

export type bindFieldOptions =
  | {
      variant: "text" | "email" | "password" | "search" | "url";
      controlledValue?: boolean;
    }
  | {
      variant: "textarea";
      controlledValue?: boolean;
    }
  | {
      variant: "checkbox";
    }
  | {
      variant: "select";
      /** По умолчанию `true`: селект почти всегда должен быть controlled. */
      controlledValue?: boolean;
    }
  | {
      variant: "number";
      controlledValue?: boolean;
    }
  | {
      variant: "range";
      min?: number;
      max?: number;
      step?: number;
      controlledValue?: boolean;
    };

/**
 * Унифицированный биндинг поля `@echojs-ecosystem/form` к пропсам Hyperdom (`input`, `textarea`, `select`, …).
 *
 * Для списков внутри `List` рекомендуется `controlledValue: true` у текстовых вариантов, чтобы значения
 * не терялись при пересоздании DOM.
 *
 * Возвращаемый тип намеренно широкий: Hyperdom различает обработчики `onChange` для `input` / `select` / `textarea`,
 * а контроллер выбирается по `variant` в рантайме.
 */
export const bindField = <T>(
  field: HyperdomFormFieldRef<T>,
  opts: bindFieldOptions,
): any => {
  const b = getBinding(field);

  switch (opts.variant) {
    case "text":
    case "email":
    case "password":
    case "search":
    case "url": {
      const base = { type: opts.variant, ...textLikeHandlers(b) } as const;
      if (!opts.controlledValue) return base;
      return { ...base, value: controlledStringValue(field) } as const;
    }

    case "textarea": {
      const base = { ...textLikeHandlers(b) } as const;
      if (!opts.controlledValue) return base;
      return { ...base, value: controlledStringValue(field) } as const;
    }

    case "checkbox": {
      return {
        type: "checkbox" as const,
        checked: () => Boolean(readFieldRef(field)),
        onChange: b.onChangeText,
        onFocus: b.onFocus,
        onBlur: b.onBlur,
      } as const;
    }

    case "select": {
      const onChange = (e: Event & { currentTarget: HTMLSelectElement }) => {
        writeFieldRef(field, e.currentTarget.value as unknown as T);
      };
      const base = {
        onChange,
        onFocus: b.onFocus,
        onBlur: b.onBlur,
      } as const;
      if (opts.controlledValue === false) return base;
      return {
        ...base,
        value: controlledStringValue(field),
      } as const;
    }

    case "number": {
      const numeric = domNumericInputHandlers(field);
      const base = {
        type: "number" as const,
        ...numeric,
        onFocus: b.onFocus,
        onBlur: b.onBlur,
      } as const;
      if (!opts.controlledValue) return base;
      return { ...base, value: controlledNumericStringValue(field, "empty") } as const;
    }

    case "range": {
      const numeric = domNumericInputHandlers(field);
      const base = {
        type: "range" as const,
        min: opts.min,
        max: opts.max,
        step: opts.step,
        ...numeric,
        onFocus: b.onFocus,
        onBlur: b.onBlur,
      } as const;
      if (!opts.controlledValue) return base;
      return { ...base, value: controlledNumericStringValue(field, "zero") } as const;
    }
  }
};
