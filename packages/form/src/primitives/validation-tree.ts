const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

/** True if the value has a `validate()` function (field/fieldSet-ish). */
const hasValidateSync = (v: unknown): v is { validate: () => unknown } =>
  isPlainObject(v) && typeof (v as any).validate === "function";

/** True if the value has an async `validateAsync()` function (field-ish). */
const hasValidateAsync = (v: unknown): v is { validateAsync: () => Promise<unknown> } =>
  isPlainObject(v) && typeof (v as any).validateAsync === "function";

const maybeFieldSetNode = (v: unknown): v is { fields: Record<string, unknown> } =>
  isPlainObject(v) && isPlainObject((v as any).fields);

const maybeFieldArrayNode = (
  v: unknown,
): v is {
  $items: { value: () => unknown };
} => isPlainObject(v) && typeof (v as any).$items?.value === "function";

export const deepValidateSync = (root: unknown): unknown => {
  if (hasValidateSync(root)) return root.validate();

  if (maybeFieldArrayNode(root)) {
    const items = root.$items.value();
    if (!Array.isArray(items)) return items;
    return items.map((row) => deepValidateSync(row));
  }

  if (maybeFieldSetNode(root)) {
    const out: Record<string, unknown> = {};
    for (const [k, child] of Object.entries(root.fields)) {
      out[k] = deepValidateSync(child);
    }
    return out;
  }

  if (!isPlainObject(root)) return root;

  const out: Record<string, unknown> = {};
  for (const [k, child] of Object.entries(root)) {
    out[k] = deepValidateSync(child);
  }
  return out;
};

export const deepValidateAsync = async (root: unknown): Promise<unknown> => {
  if (hasValidateAsync(root)) return root.validateAsync();
  // Back-compat: nested objects may still be sync-only.
  if (hasValidateSync(root) && !hasValidateAsync(root)) return root.validate();

  if (maybeFieldArrayNode(root)) {
    const items = root.$items.value();
    if (!Array.isArray(items)) return items;
    const entries = items.map((row, i) => deepValidateAsync(row).then((v) => [i, v] as const));
    const resolved = await Promise.all(entries);
    return resolved.sort((a, b) => a[0] - b[0]).map(([, v]) => v);
  }

  if (maybeFieldSetNode(root)) {
    const entries = Object.entries(root.fields).map(([k, child]) =>
      deepValidateAsync(child).then((v) => [k, v] as const),
    );
    const resolved = await Promise.all(entries);
    return Object.fromEntries(resolved);
  }

  if (!isPlainObject(root)) return root;

  const entries = Object.entries(root).map(([k, child]) =>
    deepValidateAsync(child).then((v) => [k, v] as const),
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
