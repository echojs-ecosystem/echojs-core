import { createSessionStorageAdapter } from "../adapters/session-storage";
import { withStorage } from "../core/with-storage";
import type { PersistExtension, PersistOptions } from "../core/types";

export const withSessionStorage = <Value, Snapshot = Value>(
  options: PersistOptions<Value, Snapshot>,
): PersistExtension<Value, Snapshot> => {
  const adapter = createSessionStorageAdapter();
  return withStorage(adapter, options);
};
