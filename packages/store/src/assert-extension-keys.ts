const STORE_RESERVED_KEYS = new Set([
  "kind",
  "name",
  "value",
  "set",
  "update",
  "reset",
  "$value",
  "changed",
  "reseted",
  "subscribe",
  "extend",
]);

export const assertExtensionKeys = (store: object, extension: object): void => {
  for (const key of Object.keys(extension)) {
    if (STORE_RESERVED_KEYS.has(key) || key in store) {
      throw new Error(`Store extension conflict: key "${key}" already exists`);
    }
  }
};
