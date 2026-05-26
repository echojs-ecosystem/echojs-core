import { createIndexedDBStorageAdapter } from "../adapters/indexed-db";
import { withStorage } from "../core/with-storage";
import type { IndexedDBPersistOptions, PersistExtension } from "../core/types";

export const withIndexedDB = <Value, Snapshot = Value>(
  options: IndexedDBPersistOptions<Value, Snapshot>,
): PersistExtension<Value, Snapshot> => {
  const { dbName, storeName, ...persistOptions } = options;
  const adapter = createIndexedDBStorageAdapter({ dbName, storeName });
  return withStorage(adapter, persistOptions);
};
