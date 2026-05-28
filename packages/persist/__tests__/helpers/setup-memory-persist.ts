import { createStore } from "@echojs/store";
import { createMemoryStorageAdapter, type MemoryStorageAdapter } from "../../src/adapters/memory";
import { withStorage } from "../../src/core/with-storage";
import type { PersistOptions } from "../../src/core/types";
import { flushMicrotasks } from "./fake-targets";

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
