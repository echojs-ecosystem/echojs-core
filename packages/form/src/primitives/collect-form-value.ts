const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

const isFieldNode = (value: unknown): value is { $value: { value: () => unknown } } =>
  isPlainObject(value) &&
  typeof (value as any).$value?.value === "function" &&
  typeof (value as any).set === "function" &&
  typeof (value as any).bind === "function";

const isFieldArrayNode = (
  value: unknown,
): value is { $items: { value: () => unknown }; append: (x: unknown) => void } =>
  isPlainObject(value) &&
  typeof (value as any).$items?.value === "function" &&
  typeof (value as any).append === "function";

/** `createFieldSet` — объект с `fields`, без `$value` на корне. */
const isFieldSetNode = (value: unknown): value is { fields: Record<string, unknown> } =>
  isPlainObject(value) &&
  isPlainObject((value as any).fields) &&
  typeof (value as any).validate === "function" &&
  typeof (value as any).reset === "function" &&
  !isFieldNode(value);

/**
 * Собирает «сырое» значение формы из дерева примитивов (`Field` / `FieldSet` / `FieldArray`).
 *
 * Соглашение по форме:
 * - ключи объекта `fields` совпадают с ключами итогового JSON;
 * - `FieldSet` сериализуется как **один уровень** его `fields` (без ключа `fields` в выходе);
 * - `FieldArray` → массив, каждый элемент — объект строки (рекурсивно).
 *
 * Если дерево полей **не совпадает** со схемой (например, `credentials.email` в UI, а в Zod плоский `email`),
 * задайте свой `getValue` во втором аргументе `createForm(fields, { getValue })`.
 */
export const collectFormValueFromFields = (node: unknown): unknown => {
  if (node == null) return node;

  if (isFieldNode(node)) return node.$value.value();

  if (isFieldArrayNode(node)) {
    const raw = node.$items.value();
    if (!Array.isArray(raw)) return [];
    return raw.map((row) => collectFormValueFromFields(row));
  }

  if (isFieldSetNode(node)) return collectFormValueFromFields(node.fields);

  if (isPlainObject(node)) {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] = collectFormValueFromFields(value);
    }
    return out;
  }

  return node;
};
