const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

/** True if the value has a `validate()` function (field/fieldSet-ish). */
const hasValidateSync = (value: unknown): value  is { validate: () => unknown } =>
  isPlainObject(value) && typeof (value as any).validate === "function";

/** True if the value has an async `validateAsync()` function (field-ish). */
const hasValidateAsync = (value: unknown): value is { validateAsync: () => Promise<unknown> } =>
  isPlainObject(value) && typeof (value as any).validateAsync === "function";

const maybeFieldSetNode = (value: unknown): value is { fields: Record<string, unknown> } =>
  isPlainObject(value) && isPlainObject((value as any).fields);

const maybeFieldArrayNode = (
  value: unknown,
): value is {
  $items: { value: () => unknown };
} => isPlainObject(value) && typeof (value as any).$items?.value === "function";

export const deepValidateSync = (root: unknown): unknown => {
  if (maybeFieldArrayNode(root)) {
    const items = root.$items.value();
    if (!Array.isArray(items)) return items;
    return items.map((row) => deepValidateSync(row));
  }

  if (maybeFieldSetNode(root)) {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(root.fields)) {
      out[key] = deepValidateSync(child);
    }
    return out;
  }

  if (hasValidateSync(root)) return root.validate();

  if (!isPlainObject(root)) return root;

  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(root)) {
    out[key] = deepValidateSync(child);
  }
  return out;
};

export const deepValidateAsync = async (root: unknown): Promise<unknown> => {
  if (maybeFieldArrayNode(root)) {
    const items = root.$items.value();
    if (!Array.isArray(items)) return items;
    const entries = items.map((row, i) => deepValidateAsync(row).then((v) => [i, v] as const));
    const resolved = await Promise.all(entries);
    return resolved.sort((a, b) => a[0] - b[0]).map(([, v]) => v);
  }

  if (maybeFieldSetNode(root)) {
    const entries = Object.entries(root.fields).map(([key, child]) =>
      deepValidateAsync(child).then((v) => [key, v] as const),
    );
    const resolved = await Promise.all(entries);
    return Object.fromEntries(resolved);
  }

  if (hasValidateAsync(root)) return root.validateAsync();
  // Back-compat: nested objects may still be sync-only.
  if (hasValidateSync(root) && !hasValidateAsync(root)) return root.validate();

  if (!isPlainObject(root)) return root;

  const entries = Object.entries(root).map(([key, child]) =>
    deepValidateAsync(child).then((v) => [key , v] as const),
  );
  const resolved = await Promise.all(entries);
  return Object.fromEntries(resolved);
};

export const deepReset = (root: unknown): void => {
  if (isPlainObject(root) && typeof (root as any).reset === "function") {
    (root as any).reset();
    return;
  }

  if (maybeFieldArrayNode(root)) {
    const items = root.$items.value();
    if (Array.isArray(items)) for (const row of items) deepReset(row);
    return;
  }

  if (maybeFieldSetNode(root)) {
    for (const child of Object.values(root.fields)) deepReset(child);
    return;
  }

  if (!isPlainObject(root)) return;
  for (const child of Object.values(root)) deepReset(child);
};
