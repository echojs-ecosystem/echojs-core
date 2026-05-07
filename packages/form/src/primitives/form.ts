import { effect, signal } from "@echojs-ecosystem/reactivity";
import type { Form, FormSubmitResult, FormValidationMode, StandardSchemaLike } from "../types";
import { flattenFieldErrors } from "../validation/flatten";
import { standardSchemaIssuesForUnknown } from "../validation/standard-schema";
import { collectFormValueFromFields } from "./collect-form-value";
import { hydrateFormFields } from "./hydrate";
import { deepReset, deepValidateAsync, deepValidateSync } from "./validation-tree";

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

export type CreateFormOptions<TValue, TFields extends Record<string, any>, TActions extends Record<string, any> = {}> = {
  /**
   * Снимок значения для `submit` / `validationSchema`.
   *
   * Если не указан, используется {@link collectFormValueFromFields}: структура полей должна
   * совпадать с `TValue` (см. JSDoc у `collectFormValueFromFields`). Иначе передайте свою функцию.
   */

  validate?: (fields: TFields) => Record<string, unknown>;
  validateAsync?: (fields: TFields) => Promise<Record<string, unknown>>;

  /** Back-compat alias for `validationSchema`. */
  schema?: StandardSchemaLike<TValue>;

  /** Общая Standard Schema (Zod и др.) при submit: ошибки попадают в `errors.$schema` (плоская карта путей). */
  validationSchema?: StandardSchemaLike<TValue>;

  /**
   * When to auto-run validation (incl. `validationSchema`) and keep `$errors/$schemaErrors` updated.
   *
   * Default: "manual" (only `submit()` triggers validation).
   */
  validationOn?: FormValidationMode;

  /**
   * Override how a submit "value snapshot" is built from the field tree.
   *
   * By default we use `collectFormValueFromFields(...)`.
   */
  getValue?: () => TValue;

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

  /**
   * Build an actions bag next to schema/options.
   *
   * This lets you define array ops and other form logic once, and then just call `form.actions.*`.
   */
  actions?: (form: Form<TValue, TFields, {}>) => TActions;
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
type ActionsFromOptions<T> = T extends { actions?: (...args: any[]) => infer A } ? A : {};

export const createForm = <
  TValue,
  TFields extends Record<string, any> = Record<string, any>,
  TOptions extends CreateFormOptions<TValue, TFields, any> = CreateFormOptions<TValue, TFields, {}>,
>(
  fields: TFields,
  opts: TOptions = {} as TOptions,
): Form<TValue, TFields, ActionsFromOptions<TOptions>> => {
  const $submitting = signal(false);
  const $submitCount = signal(0);
  const $errors = signal<Record<string, unknown> | undefined>(undefined);
  const $schemaErrors = signal<Record<string, string[]> | undefined>(undefined);

  const resolvedFields = fields;
  const rootSchema = opts.validationSchema ?? opts.schema;
  const factories = opts.fieldArrayFactories as Record<string, () => unknown> | undefined;
  const validationOn = opts.validationOn ?? "manual";

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
    (opts.getValue ? opts.getValue() : (collectFormValueFromFields(resolvedFields) as TValue));

  const validate = (): Record<string, unknown> => {
    if (opts.validate) return opts.validate(resolvedFields);
    return deepValidateSync(resolvedFields) as Record<string, unknown>;
  };

  const validateAsync = async (): Promise<Record<string, unknown>> => {
    const fieldTree = opts.validateAsync
      ? await opts.validateAsync(resolvedFields)
      : opts.validate
        ? opts.validate(resolvedFields)
        : ((await deepValidateAsync(resolvedFields)) as Record<string, unknown>);

    if (!rootSchema) return fieldTree;

    const value = snapshotValue();
    const res = await standardSchemaIssuesForUnknown(rootSchema as any, value);
    const schemaFlat = flattenFieldErrors(res.ok ? [] : res.issues);
    const rootSchemaErrors = Object.keys(schemaFlat).length > 0 ? { $schema: schemaFlat } : {};

    return { ...fieldTree, ...rootSchemaErrors };
  };

  const updateErrorsSignals = (errs: Record<string, unknown>): void => {
    $errors.set(errs);
    const flat = (errs as { $schema?: Record<string, string[]> }).$schema;
    $schemaErrors.set(flat && Object.keys(flat).length ? flat : undefined);
  };

  const runValidation = async (): Promise<Record<string, unknown>> => {
    const errs = await validateAsync();
    updateErrorsSignals(errs);
    return errs;
  };

  const trackValidationTriggers = (node: unknown): void => {
    if (node == null) return;

    // Field-ish
    if (isPlainObject(node) && (node as any).$value && (node as any).$meta) {
      if (validationOn === "onChange" || validationOn === "all") (node as any).$value.value();
      if (validationOn === "onBlur" || validationOn === "all") (node as any).$meta.value().touched;
      if (validationOn === "onFocus" || validationOn === "all") (node as any).$meta.value().focused;
      return;
    }

    // FieldArray-ish
    if (isPlainObject(node) && typeof (node as any).$items?.value === "function") {
      const items = (node as any).$items.value();
      if (Array.isArray(items)) for (const row of items) trackValidationTriggers(row);
      return;
    }

    // FieldSet-ish
    if (isPlainObject(node) && isPlainObject((node as any).fields)) {
      for (const child of Object.values((node as any).fields)) trackValidationTriggers(child);
      return;
    }

    if (!isPlainObject(node)) return;
    for (const child of Object.values(node)) trackValidationTriggers(child);
  };

  if (validationOn !== "manual") {
    effect(() => {
      trackValidationTriggers(resolvedFields);
      void runValidation();
    });
  }

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
    const errors = await runValidation();

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
    } catch (error) {
      return { ok: false, errors: { submit: error } };
    } finally {
      $submitting.set(false);
    }
  };

  const form = {
    fields: resolvedFields,
    $submitting,
    $submitCount,
    $errors,
    $schemaErrors,
    validate,
    validateAsync,
    reset,
    hydrate,
    submit,
  } as unknown as Form<TValue, TFields, ActionsFromOptions<TOptions>>;

  (form as any).actions = (opts.actions ? opts.actions(form as any) : {}) as ActionsFromOptions<TOptions>;

  return form;
};

/**
 * Curry helper to avoid partial generic inference limitations.
 *
 * Lets you write:
 * `const make = createFormFor<MyValue>(); const form = make(fields, { validationSchema, actions: ... })`
 */
export const createFormFor =
  <TValue>() =>
  <
    TFields extends Record<string, any>,
    TOptions extends CreateFormOptions<TValue, TFields, any> = CreateFormOptions<TValue, TFields, {}>,
  >(
    fields: TFields,
    opts: TOptions,
  ): Form<TValue, TFields, ActionsFromOptions<TOptions>> =>
    createForm<TValue, TFields, TOptions>(fields, opts);
