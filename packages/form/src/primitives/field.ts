import { signal } from "@echojs-ecosystem/reactivity";
import type { Field, FieldBinding, FieldCore, FieldMeta } from "../types";
import { attachFieldPersist } from "./field-persist";

const defaultMeta = (): FieldMeta => ({
  dirty: false,
  touched: false,
  focused: false,
  errors: [],
});

/**
 * Одно поле формы: значение и мета в сигналах, биндинг к DOM без встроенной схемы.
 * Валидацию на submit задавайте через `createForm(..., { schema | validate })`.
 */
export const createField = <T>(initial: T): Field<T> => {
  let binding: FieldBinding | undefined;
  const $value = signal<T>(initial);
  const $meta = signal<FieldMeta>(defaultMeta());

  const setValue = (next: T): void => {
    $value.set(next);
    $meta.update((prev) => ({ ...prev, dirty: true, errors: [] }));
  };

  const focus = (): void => {
    $meta.update((prev) => ({ ...prev, focused: true }))
  };

  const blur = (): void => {
    $meta.update((prev) => ({ ...prev, focused: false, touched: true }));
  };


  const bind = (): FieldBinding => {
    if (binding) return binding;

    const isBool = typeof initial === "boolean";

    const onInputText = (event: { currentTarget: HTMLInputElement | HTMLTextAreaElement }): void => {
      if (isBool) return;
      const raw = event.currentTarget.value;
      setValue(raw as unknown as T);
    };

    const onChangeText = (event: { currentTarget: HTMLInputElement | HTMLTextAreaElement }): void => {
      if (isBool) {
        const checked = (event.currentTarget as HTMLInputElement).checked;
        setValue(checked as unknown as T);
        return;
      }

      const raw = event.currentTarget.value;
      setValue(raw as unknown as T);
    };

    const onFocus = (): void => focus();
    const onBlur = (): void => blur();

    binding = { onInputText, onChangeText, onFocus, onBlur };
    return binding;
  };

  const validate = (): string[] => [];
  const validateAsync = async (): Promise<string[]> => [];

  const core: FieldCore<T> = {
    $value,
    $meta,

    set: (next) => setValue(next),
    reset: (next) => {
      $value.set(next !== undefined ? next : initial);
      $meta.set(defaultMeta());
    },

    focus,
    blur,
    touch: () => $meta.update((prev) => ({ ...prev, touched: true })),

    bind,

    validate,
    validateAsync,
    clearErrors: () => $meta.update((prev) => ({ ...prev, errors: [] })),
  };

  return attachFieldPersist(core);
};
