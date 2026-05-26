import type { StorageAdapter } from "../core/types";

export type MemoryStorageAdapter = StorageAdapter & {
  clear(): void;
  entries(): ReadonlyMap<string, string>;
};

export const createMemoryStorageAdapter = (): MemoryStorageAdapter => {
  const storage = new Map<string, string>();
  const listeners = new Map<string, Set<(value: string | null) => void>>();

  const notify = (key: string): void => {
    const value = storage.get(key) ?? null;
    const keyListeners = listeners.get(key);
    if (!keyListeners) {
      return;
    }
    for (const listener of keyListeners) {
      listener(value);
    }
  };

  return {
    kind: "memory",

    getItem(key) {
      return storage.get(key) ?? null;
    },

    setItem(key, value) {
      storage.set(key, value);
      notify(key);
    },

    removeItem(key) {
      storage.delete(key);
      notify(key);
    },

    subscribe(key, listener) {
      const set = listeners.get(key) ?? new Set();
      set.add(listener);
      listeners.set(key, set);
      return () => {
        set.delete(listener);
        if (set.size === 0) {
          listeners.delete(key);
        }
      };
    },

    clear() {
      storage.clear();
      for (const key of [...listeners.keys()]) {
        notify(key);
      }
    },

    entries() {
      return storage;
    },
  };
};
