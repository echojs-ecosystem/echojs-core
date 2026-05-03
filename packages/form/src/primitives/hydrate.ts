import type { FieldArray } from "../types";

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

const isField = (v: unknown): v is { set: (x: unknown) => void; $value: { value: () => unknown } } =>
  isPlainObject(v) && typeof (v as any).set === "function" && typeof (v as any).$value?.value === "function";

const isFieldSetNode = (v: unknown): v is { fields: Record<string, unknown> } =>
  isPlainObject(v) && isPlainObject((v as any).fields);

const isFieldArrayNode = (v: unknown): v is FieldArray<unknown> =>
  isPlainObject(v) && typeof (v as any).$items?.value === "function" && typeof (v as any).append === "function";

const readItems = (arr: FieldArray<unknown>): unknown[] => {
  const v = arr.$items.value();
  return Array.isArray(v) ? v : [];
};

/**
 * Рекурсивно записывает `partial` в дерево полей (Field / FieldSet / FieldArray).
 *
 * Для расширения массива нужен `rowFactory` из второго аргумента `createForm(fields, { fieldArrayFactories })`.
 */
export const hydrateFormFields = (
  fields: Record<string, unknown>,
  partial: unknown,
  fieldArrayFactories?: Record<string, () => unknown>,
): void => {
  if (!isPlainObject(partial)) return;

  for (const [key, raw] of Object.entries(partial)) {
    if (!(key in fields)) continue;
    const node = fields[key]!;
    hydrateNode(node, raw, fieldArrayFactories?.[key]);
  }
};

const hydrateNode = (node: unknown, partial: unknown, rowFactory?: () => unknown): void => {
  if (isField(node)) {
    node.set(partial as never);
    return;
  }

  if (isFieldSetNode(node)) {
    if (!isPlainObject(partial)) return;
    hydrateFormFields(node.fields as Record<string, unknown>, partial, undefined);
    return;
  }

  if (isFieldArrayNode(node)) {
    if (!Array.isArray(partial)) return;

    const target = partial as unknown[];
    const arr = node;

    // укорачиваем
    while (readItems(arr).length > target.length) {
      arr.removeAt(readItems(arr).length - 1);
    }

    // удлиняем
    while (readItems(arr).length < target.length) {
      if (!rowFactory) break;
      arr.append(rowFactory() as never);
    }

    const rows = readItems(arr);
    for (let i = 0; i < target.length && i < rows.length; i++) {
      hydrateNode(rows[i], target[i], undefined);
    }
    return;
  }

  // обычный объект-контейнер (редко)
  if (isPlainObject(node) && isPlainObject(partial)) {
    hydrateFormFields(node as Record<string, unknown>, partial, undefined);
  }
};
