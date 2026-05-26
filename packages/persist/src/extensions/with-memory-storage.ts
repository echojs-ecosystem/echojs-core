import { createMemoryStorageAdapter } from "../adapters/memory";
import { withStorage } from "../core/with-storage";
import type { PersistExtension, PersistOptions } from "../core/types";

export const withMemoryStorage = <Value, Snapshot = Value>(
  options: PersistOptions<Value, Snapshot>,
): PersistExtension<Value, Snapshot> => {
  const adapter = createMemoryStorageAdapter();
  return withStorage(adapter, options);
};
