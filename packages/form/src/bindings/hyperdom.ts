import type { Field, FieldAccessor } from "../types";

type Bindable<T> =
  | Pick<Field<T>, "bind">
  | Pick<FieldAccessor<T>, "handlers">;

/** Поле формы, к которому можно привязать Hyperdom-контроллер (`Field` или `FieldAccessor` из `wireFormModel`). */
export type HyperdomFormFieldRef<T> = Field<T> | FieldAccessor<T>;

const getBinding = <T>(field: Bindable<T>) => ("bind" in field ? field.bind() : field.handlers);

const readFieldRef = <T>(field: HyperdomFormFieldRef<T>): T => {
  if ("$value" in field && (field as Field<T>).$value) return (field as Field<T>).$value.value() as T;
  return (field as FieldAccessor<T>).value() as T;
};

const writeFieldRef = <T>(field: HyperdomFormFieldRef<T>, next: T): void => {
  field.set(next);
};

const controlledStringValue = <T>(field: HyperdomFormFieldRef<T>): (() => string) => {
  return () => {
    const v = readFieldRef(field);
    if (v == null) return "";
    return String(v);
  };
};

export type BindFieldControllerOptions =
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
 * Унифицированный биндинг поля `@echojs/form` к пропсам Hyperdom (`input`, `textarea`, `select`, …).
 *
 * Для списков внутри `List` рекомендуется `controlledValue: true` у текстовых вариантов, чтобы значения
 * не терялись при пересоздании DOM.
 */
/**
 * Возвращаемый тип намеренно широкий: Hyperdom различает обработчики `onChange` для `input` / `select` / `textarea`,
 * а контроллер выбирается по `variant` в рантайме.
 */
export const bindFieldController = <T>(field: HyperdomFormFieldRef<T>, opts: BindFieldControllerOptions): any => {
  const b = getBinding(field as unknown as Bindable<T>);

  switch (opts.variant) {
    case "text":
    case "email":
    case "password":
    case "search":
    case "url": {
      const base = {
        type: opts.variant,
        onInput: b.onInputText,
        onChange: b.onChangeText,
        onFocus: b.onFocus,
        onBlur: b.onBlur,
      } as const;
      if (!opts.controlledValue) return base;
      return { ...base, value: controlledStringValue(field) } as const;
    }

    case "textarea": {
      const base = {
        onInput: b.onInputText,
        onChange: b.onChangeText,
        onFocus: b.onFocus,
        onBlur: b.onBlur,
      } as const;
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
      const onInput = (e: Event & { currentTarget: HTMLInputElement }) => {
        b.onInputText(e as { currentTarget: HTMLInputElement | HTMLTextAreaElement });
      };
      const onChange = (e: Event & { currentTarget: HTMLInputElement }) => {
        b.onChangeText(e as { currentTarget: HTMLInputElement | HTMLTextAreaElement });
      };
      const base = {
        type: "number" as const,
        onInput,
        onChange,
        onFocus: b.onFocus,
        onBlur: b.onBlur,
      } as const;
      if (!opts.controlledValue) return base;
      const value = (): string => {
        const v = readFieldRef(field);
        if (v == null || (typeof v === "number" && Number.isNaN(v))) return "";
        return String(v);
      };
      return { ...base, value } as const;
    }

    case "range": {
      const onInput = (e: Event & { currentTarget: HTMLInputElement }) => {
        b.onInputText(e as { currentTarget: HTMLInputElement | HTMLTextAreaElement });
      };
      const onChange = (e: Event & { currentTarget: HTMLInputElement }) => {
        b.onChangeText(e as { currentTarget: HTMLInputElement | HTMLTextAreaElement });
      };
      const base = {
        type: "range" as const,
        min: opts.min,
        max: opts.max,
        step: opts.step,
        onInput,
        onChange,
        onFocus: b.onFocus,
        onBlur: b.onBlur,
      } as const;
      if (!opts.controlledValue) return base;
      const value = (): string => {
        const v = readFieldRef(field);
        if (v == null || (typeof v === "number" && Number.isNaN(v))) return "0";
        return String(v);
      };
      return { ...base, value } as const;
    }

  }
};
