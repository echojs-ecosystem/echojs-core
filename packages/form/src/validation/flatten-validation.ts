/**
 * Схлопывает дерево результатов `deepValidateSync/Async` в плоскую карту `путь → сообщения`.
 *
 * Пути строятся через точку; индексы массивов — как числовые сегменты (`tags.0.tag`).
 */
export const flattenValidationErrors = (node: unknown, prefix = ""): Record<string, string[]> => {
  const out: Record<string, string[]> = {};
  const join = (p: string) => (prefix.length ? `${prefix}.${p}` : p);
  const joinIdx = (i: number) => (prefix.length ? `${prefix}.${i}` : String(i));

  if (node == null) return out;

  if (typeof node === "string") {
    if (node.trim().length > 0) out[prefix.length ? prefix : "$root"] = [node];
    return out;
  }

  if (Array.isArray(node)) {
    if (node.length === 0) return out;

    if (node.every((x) => typeof x === "string")) {
      const msgs = node.filter((x): x is string => typeof x === "string" && x.length > 0);
      if (msgs.length > 0) out[prefix.length ? prefix : "$root"] = msgs;
      return out;
    }

    for (let i = 0; i < node.length; i++) {
      Object.assign(out, flattenValidationErrors(node[i], joinIdx(i)));
    }
    return out;
  }

  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      Object.assign(out, flattenValidationErrors(v, join(k)));
    }
    return out;
  }

  return out;
};

/**
 * Оставляет только те ошибки общей `validationSchema`, которые **не перекрыты** ошибками полей.
 *
 * Правило: если у поля есть ошибка по пути `fk`, то отбрасываем любую ошибку схемы по пути `sk`, если
 * `fk === sk`, либо один путь является префиксом другого (вложенность / массивы).
 */
export const filterRootSchemaErrorsDeferredToFieldErrors = (
  fieldFlat: Record<string, string[]>,
  schemaFlat: Record<string, string[]>,
): Record<string, string[]> => {
  const fieldKeysWithErrors = Object.entries(fieldFlat)
    .filter(([, msgs]) => msgs.length > 0)
    .map(([k]) => k);

  const filtered: Record<string, string[]> = {};
  for (const [sk, msgs] of Object.entries(schemaFlat)) {
    if (!msgs.length) continue;

    const blocked = fieldKeysWithErrors.some((fk) => {
      if (fk === sk) return true;
      if (fk.startsWith(`${sk}.`)) return true;
      if (sk.startsWith(`${fk}.`)) return true;
      return false;
    });

    if (!blocked) filtered[sk] = msgs;
  }

  return filtered;
};
