const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

const isFieldNode = (v: unknown): v is { $value: { value: () => unknown } } =>
  isPlainObject(v) &&
  typeof (v as any).$value?.value === "function" &&
  typeof (v as any).set === "function" &&
  typeof (v as any).bind === "function";

const isFieldArrayNode = (
  v: unknown,
): v is { $items: { value: () => unknown }; append: (x: unknown) => void } =>
  isPlainObject(v) &&
  typeof (v as any).$items?.value === "function" &&
  typeof (v as any).append === "function";

/** `createFieldSet` — объект с `fields`, без `$value` на корне. */
const isFieldSetNode = (v: unknown): v is { fields: Record<string, unknown> } =>
  isPlainObject(v) &&
  isPlainObject((v as any).fields) &&
  typeof (v as any).validate === "function" &&
  typeof (v as any).reset === "function" &&
  !isFieldNode(v);

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
    for (const [k, v] of Object.entries(node)) {
      out[k] = collectFormValueFromFields(v);
    }
    return out;
  }

  return node;
};
