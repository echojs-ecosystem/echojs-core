export const defaultEquals = (a: unknown, b: unknown): boolean => Object.is(a, b);

export const shallowEqual = (objectA: unknown, objectB: unknown): boolean => {
  if (objectA === objectB) {
    return true;
  }
  if (typeof objectA !== "object" || objectA === null) {
    return false;
  }
  if (typeof objectB !== "object" || objectB === null) {
    return false;
  }

  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objectB, key)) {
      return false;
    }
    if (!Object.is((objectA as Record<string, unknown>)[key], (objectB as Record<string, unknown>)[key])) {
      return false;
    }
  }

  return true;
};

/** Default equality for parsed query-param groups — shallow compare by field. */
export const queryParamsEquals = shallowEqual;
