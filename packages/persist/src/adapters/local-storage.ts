import type { StorageAdapter } from "../core/types";
import { hasLocalStorage, warnDev } from "../core/utils";
import { createMemoryStorageAdapter } from "./memory";

export const createLocalStorageAdapter = (): StorageAdapter => {
  if (!hasLocalStorage()) {
    warnDev("localStorage is unavailable; falling back to in-memory storage.");
    return createMemoryStorageAdapter();
  }

  const storage = window.localStorage;

  return {
    kind: "localStorage",

    getItem(key) {
      return storage.getItem(key);
    },

    setItem(key, value) {
      storage.setItem(key, value);
    },

    removeItem(key) {
      storage.removeItem(key);
    },

    subscribe(key, listener) {
      if (typeof window === "undefined") {
        return () => {};
      }

      const handler = (event: StorageEvent) => {
        if (event.key !== key) {
          return;
        }
        if (event.storageArea !== storage) {
          return;
        }
        listener(event.newValue);
      };

      window.addEventListener("storage", handler);
      return () => {
        window.removeEventListener("storage", handler);
      };
    },
  };
};
