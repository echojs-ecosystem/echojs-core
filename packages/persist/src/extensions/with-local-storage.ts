import { createLocalStorageAdapter } from "../adapters/local-storage";
import { withStorage } from "../core/with-storage";
import type { PersistExtension, PersistOptions } from "../core/types";

export const withLocalStorage = <Value, Snapshot = Value>(
  options: PersistOptions<Value, Snapshot>,
): PersistExtension<Value, Snapshot> => {
  const adapter = createLocalStorageAdapter();
  return withStorage(adapter, options);
};
