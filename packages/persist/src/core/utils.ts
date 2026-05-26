export const isDev = (): boolean => {
  if (typeof import.meta !== "undefined" && "env" in import.meta) {
    const meta = import.meta as ImportMeta & { env?: { DEV?: boolean; MODE?: string } };
    return meta.env?.DEV === true || meta.env?.MODE === "development";
  }
  return false;
};

export const warnDev = (message: string): void => {
  if (!isDev()) {
    return;
  }
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(`[@echojs/persist] ${message}`);
  }
};

export const resolveAsync = async <T>(value: T | Promise<T>): Promise<T> => {
  return await Promise.resolve(value);
};

export const hasWindow = (): boolean => {
  return typeof window !== "undefined";
};

export const hasDocument = (): boolean => {
  return typeof document !== "undefined";
};

export const hasLocalStorage = (): boolean => {
  if (!hasWindow()) {
    return false;
  }
  try {
    const storage = window.localStorage;
    const key = "__echojs_persist_test__";
    storage.setItem(key, "1");
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const hasSessionStorage = (): boolean => {
  if (!hasWindow()) {
    return false;
  }
  try {
    const storage = window.sessionStorage;
    const key = "__echojs_persist_test__";
    storage.setItem(key, "1");
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const hasIndexedDB = (): boolean => {
  return hasWindow() && "indexedDB" in window;
};
