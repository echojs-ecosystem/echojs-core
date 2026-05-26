import type {
  Extendable,
  Persistable,
  PersistExtension,
  PersistExtensionResult,
} from "../core/types";

export const persist = <T extends Persistable<Value>, Value, Snapshot = Value>(
  target: T,
  extension: PersistExtension<Value, Snapshot>,
): T & PersistExtensionResult<Value, Snapshot> => {
  const extendable = target as T & Extendable<T, PersistExtensionResult<Value, Snapshot>>;

  if (typeof extendable.extend === "function") {
    return extendable.extend(extension);
  }

  const result = extension(target);
  Object.assign(target, result);
  return target as T & PersistExtensionResult<Value, Snapshot>;
};

export const persistField = <Value, Snapshot = Value>(
  field: Persistable<Value>,
  extension: PersistExtension<Value, Snapshot>,
) => {
  return persist(field, extension);
};

export const persistFieldArray = <Item, Snapshot = Item[]>(
  fieldArray: Persistable<Item[]>,
  extension: PersistExtension<Item[], Snapshot>,
) => {
  return persist(fieldArray, extension);
};
