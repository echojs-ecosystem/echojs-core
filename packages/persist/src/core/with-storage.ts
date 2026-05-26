import { createPersist } from "./persist";
import type {
  PersistExtension,
  PersistOptions,
  StorageAdapter,
} from "./types";

export const withStorage = <Value, Snapshot = Value>(
  adapter: StorageAdapter,
  options: PersistOptions<Value, Snapshot>,
): PersistExtension<Value, Snapshot> => {
  return (target) => {
    const persist = createPersist(target, adapter, options);

    if (options.hydrate !== false) {
      void persist.hydrate();
    }

    return { persist };
  };
};
