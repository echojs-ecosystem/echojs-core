import { createStore } from "@echojs/store";
import { createMemoryStorageAdapter, type MemoryStorageAdapter } from "../../src/adapters/memory.js";
import { withStorage } from "../../src/core/with-storage.js";
import type { PersistOptions } from "../../src/core/types.js";
import { flushMicrotasks } from "./fake-targets.js";

export const setupMemoryPersist = <Value, Snapshot = Value>(
  initial: Value,
  options: PersistOptions<Value, Snapshot> & { hydrate?: boolean },
  adapter: MemoryStorageAdapter = createMemoryStorageAdapter(),
) => {
  const store = createStore(initial).extend(withStorage(adapter, { hydrate: false, ...options }));

  const wait = async () => {
    await store.persist.hydrate();
    await flushMicrotasks();
  };

  const save = async () => {
    await store.persist.save();
    await flushMicrotasks();
  };

  return { store, adapter, wait, save };
};
