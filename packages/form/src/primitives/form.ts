import { signal } from "@echojs-ecosystem/reactivity";
import type { Form, FormSubmitResult, StandardSchemaLike } from "../types";
import { flattenFieldErrors } from "../validation/flatten";
import { standardSchemaIssuesForUnknown } from "../validation/standard-schema";
import { collectFormValueFromFields } from "./collect-form-value";
import { hydrateFormFields } from "./hydrate";
import { deepReset, deepValidateAsync, deepValidateSync } from "./validation-tree";

export type CreateFormOptions<TValue, TFields extends Record<string, any>> = {
  /**
   * Снимок значения для `submit` / `validationSchema`.
   *
   * Если не указан, используется {@link collectFormValueFromFields}: структура полей должна
   * совпадать с `TValue` (см. JSDoc у `collectFormValueFromFields`). Иначе передайте свою функцию.
   */
  getValue?: (fields: TFields) => TValue;

  validate?: (fields: TFields) => Record<string, unknown>;
  validateAsync?: (fields: TFields) => Promise<Record<string, unknown>>;

  /** Общая Standard Schema (Zod и др.) при submit: ошибки попадают в `errors.$schema` (плоская карта путей). */
  schema?: StandardSchemaLike<TValue>;
  /** Алиас для `schema`. */
  validationSchema?: StandardSchemaLike<TValue>;

  /**
   * Начальные значения: записываются в дерево полей через `hydrateFormFields` сразу после создания формы.
   */
  defaultValues?: Partial<TValue>;
  /**
   * Асинхронная подгрузка значений (частичный объект). Применяется через `hydrateFormFields`.
   */
  defaultAsyncValues?: () => Promise<Partial<TValue>>;

  /**
   * Фабрики строк для верхнеуровневых `createFieldArray` — нужны, если `defaultAsyncValues` удлиняет массив.
   */
  fieldArrayFactories?: Partial<{ [K in keyof TFields]: () => unknown }>;
};

/**
 * Обёртка над деревом полей: submit, валидация полей (`createField` / `createFieldArray`) и опционально схема на submit.
 *
 * @example
 * ```ts
 * const form = createForm(
 *   { title: createField(""), items: createFieldArray([]) },
 *   { validationSchema: z.object({ ... }), defaultValues: { title: "a" } },
 * );
 * ```
 */
export const createForm = <TValue, TFields extends Record<string, any>>(
  fields: TFields,
  opts: CreateFormOptions<TValue, TFields> = {},
): Form<TValue, TFields> => {
  const $submitting = signal(false);
  const $submitCount = signal(0);

  const resolvedFields = fields;

  const rootSchema = (opts.validationSchema ?? opts.schema) as
    | StandardSchemaLike<TValue>
    | undefined;

  const factories = opts.fieldArrayFactories as Record<string, () => unknown> | undefined;

  if (opts.defaultValues && Object.keys(opts.defaultValues as object).length > 0) {
    hydrateFormFields(
      resolvedFields as unknown as Record<string, unknown>,
      opts.defaultValues as object,
      factories,
    );
  }

  if (opts.defaultAsyncValues) {
    void opts.defaultAsyncValues().then((extra) => {
      hydrateFormFields(
        resolvedFields as unknown as Record<string, unknown>,
        extra as object,
        factories,
      );
    });
  }

  const snapshotValue = (): TValue =>
    opts.getValue
      ? opts.getValue(resolvedFields)
      : (collectFormValueFromFields(resolvedFields) as TValue);

  const validate = (): Record<string, unknown> => {
    if (opts.validate) return opts.validate(resolvedFields);
    return deepValidateSync(resolvedFields) as Record<string, unknown>;
  };

  const validateAsync = async (): Promise<Record<string, unknown>> => {
    const fieldTree = opts.validateAsync
      ? await opts.validateAsync(resolvedFields)
      : ((await deepValidateAsync(resolvedFields)) as Record<string, unknown>);

    if (!rootSchema) return fieldTree;

    const value = snapshotValue();
    const res = await standardSchemaIssuesForUnknown(rootSchema as any, value);
    const schemaFlat = flattenFieldErrors(res.ok ? [] : res.issues);
    const rootSchemaErrors = Object.keys(schemaFlat).length > 0 ? { $schema: schemaFlat } : {};

    return { ...fieldTree, ...rootSchemaErrors };
  };

  const reset = (): void => {
    deepReset(resolvedFields);
  };

  const getValue = (): TValue => snapshotValue();

  const hydrate = (partial: Partial<TValue>): void => {
    hydrateFormFields(
      resolvedFields as unknown as Record<string, unknown>,
      partial as object,
      factories,
    );
  };

  const submit = async (
    handler: (value: TValue) => void | Promise<void>,
  ): Promise<FormSubmitResult<TValue>> => {
    $submitCount.update((n) => n + 1);
    const errors = await validateAsync();

    const hasErrors = (obj: unknown): boolean => {
      if (obj == null) return false;
      if (Array.isArray(obj)) {
        if (obj.length === 0) return false;
        return obj.some(hasErrors);
      }
      if (typeof obj === "object") {
        const entries = Object.values(obj as Record<string, unknown>);
        return entries.some(hasErrors);
      }
      if (typeof obj === "string") return obj.length > 0;
      return false;
    };

    if (hasErrors(errors)) {
      return { ok: false, errors };
    }

    $submitting.set(true);
    try {
      const value = getValue();
      await handler(value);
      return { ok: true, value };
    } catch (e) {
      return { ok: false, errors: { submit: e } };
    } finally {
      $submitting.set(false);
    }
  };

  return {
    fields: resolvedFields,
    $submitting,
    $submitCount,
    validate,
    validateAsync,
    reset,
    hydrate,
    getValue,
    submit,
  };
};
