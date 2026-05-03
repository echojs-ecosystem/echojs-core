import { signal } from "@echojs-ecosystem/reactivity";
import type {
  Field,
  FieldBinding,
  FieldMeta,
  FieldValidator,
  FieldValidationMode,
  StandardSchemaLike,
} from "../types";
import {
  normalizeStandardSchemaPathSegments,
  standardSchemaIssuesForUnknown,
  standardSchemaIssuesForUnknownSync,
} from "../validation/standard-schema";

const defaultMeta = (): FieldMeta => ({
  dirty: false,
  touched: false,
  focused: false,
  errors: [],
});

const dedupe = (messages: string[]): string[] => Array.from(new Set(messages));

const scopeStandardSchemaIssues = (opts: {
  issues: readonly { message: string; path?: readonly unknown[] }[];
  schemaIssuePrefix?: string;
}): { message: string; path: string[] }[] => {
  const prefix = opts.schemaIssuePrefix;

  if (typeof prefix === "string" && prefix.length > 0) {
    return opts.issues
      .filter((i) => normalizeStandardSchemaPathSegments(i.path)?.[0] === prefix)
      .map((i) => {
        const segments = normalizeStandardSchemaPathSegments(i.path);
        const rest = segments.slice(1);
        return { message: i.message, path: rest };
      });
  }

  return opts.issues.map((i) => ({
    message: i.message,
    path: normalizeStandardSchemaPathSegments(i.path),
  }));
};

/**
 * Creates a single form field.
 *
 * Stores the value and meta-state in signals, supports validation and dirty/touched tracking.
 */
export const createField = <T>(
  initial: T,
  opts?: {
    validate?: FieldValidator<T>[];
    /** Standard Schema-compatible schema (Zod v3.25+ exposes `~standard.validate`). */
    schema?: StandardSchemaLike<T>;
    /**
     * Filters schema issues whose first path segment matches `schemaIssuePrefix`,
     * then strips that prefix from remaining path segments.
     */
    schemaIssuePrefix?: string;
    validationMode?: FieldValidationMode;
    /**
     * Parses string-ish DOM values into the typed field value (`number`, enums, ...).
     *
     * Note: for `boolean` fields, prefer using `type: "checkbox"` bindings and `parseDOMChecked`.
     */
    parseDOMValue?: (raw: string) => T;
    /** Checkbox-friendly parser (`input[type=checkbox]`). */
    parseDOMChecked?: (checked: boolean) => T;
  },
): Field<T> => {
  const validators = opts?.validate ?? [];
  const schema = opts?.schema;
  const schemaIssuePrefix = opts?.schemaIssuePrefix;
  const validationMode: FieldValidationMode = opts?.validationMode ?? "manual";

  const parseDOMValue = opts?.parseDOMValue;
  const parseDOMChecked = opts?.parseDOMChecked;

  const $value = signal<T>(initial);
  const $meta = signal<FieldMeta>(defaultMeta());

  const runLegacyValidators = (): string[] =>
    validators.map((v) => v($value.value())).filter((e): e is string => !!e);

  const applyErrors = (messages: string[]): string[] => {
    const next = dedupe(messages);
    $meta.update((m) => ({ ...m, errors: next }));
    return next;
  };

  const runSchemaSync = (): string[] => {
    if (!schema) return [];

    const res = standardSchemaIssuesForUnknownSync(schema as any, $value.value());
    const scoped = scopeStandardSchemaIssues({
      issues: res.ok ? [] : res.issues,
      schemaIssuePrefix,
    });

    const messages = scoped.map((i) => i.message);
    return applyErrors([...messages, ...runLegacyValidators()]);
  };

  const runSchemaAsync = async (): Promise<string[]> => {
    if (!schema) return [];

    const res = await standardSchemaIssuesForUnknown(schema as any, $value.value());
    const scoped = scopeStandardSchemaIssues({
      issues: res.ok ? [] : res.issues,
      schemaIssuePrefix,
    });

    const messages = scoped.map((i) => i.message);
    return applyErrors([...messages, ...runLegacyValidators()]);
  };

  const setValue = (next: T): void => {
    $value.set(next);
    $meta.update((m) => ({ ...m, dirty: true }));

    if (!schema || validationMode === "manual") {
      applyErrors(runLegacyValidators());
      return;
    }

    if (validationMode === "onChange") void runSchemaAsync();
  };

  const focus = (): void => $meta.update((m) => ({ ...m, focused: true }));

  const blur = (): void => {
    $meta.update((m) => ({ ...m, focused: false, touched: true }));

    if (!schema || validationMode === "manual") {
      applyErrors(runLegacyValidators());
      return;
    }

    if (validationMode === "onBlur") void runSchemaAsync();
  };

  let binding: FieldBinding | undefined;

  const bind = (): FieldBinding => {
    if (binding) return binding;

    const isBool = typeof initial === "boolean";

    const onInputText = (e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }): void => {
      if (isBool) return;
      const raw = e.currentTarget.value;
      const next = parseDOMValue ? parseDOMValue(raw) : (raw as unknown as T);
      setValue(next);
    };

    const onChangeText = (e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }): void => {
      if (isBool) {
        const checked = (e.currentTarget as HTMLInputElement).checked;
        const next = parseDOMChecked ? parseDOMChecked(checked) : (checked as unknown as T);
        setValue(next);
        return;
      }

      const raw = e.currentTarget.value;
      const next = parseDOMValue ? parseDOMValue(raw) : (raw as unknown as T);
      setValue(next);
    };

    const onFocus = (): void => focus();
    const onBlur = (): void => blur();

    binding = { onInputText, onChangeText, onFocus, onBlur };
    return binding;
  };

  const validate = (): string[] => {
    if (schema) return runSchemaSync();
    return applyErrors(runLegacyValidators());
  };

  const validateAsync = async (): Promise<string[]> => {
    if (schema) return runSchemaAsync();
    return applyErrors(runLegacyValidators());
  };

  return {
    $value,
    $meta,

    set: (next) => setValue(next),
    reset: (next) => {
      $value.set(next !== undefined ? next : initial);
      $meta.set(defaultMeta());
    },

    focus,
    blur,
    touch: () => $meta.update((m) => ({ ...m, touched: true })),

    bind,

    validate,
    validateAsync,
    clearErrors: () => $meta.update((m) => ({ ...m, errors: [] })),
  };
};
