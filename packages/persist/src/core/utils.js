export const isDev = () => {
    if (typeof import.meta !== "undefined" && "env" in import.meta) {
        const meta = import.meta;
        return meta.env?.DEV === true || meta.env?.MODE === "development";
    }
    return false;
};
export const warnDev = (message) => {
    if (!isDev()) {
        return;
    }
    if (typeof console !== "undefined" && typeof console.warn === "function") {
        console.warn(`[@echojs/persist] ${message}`);
    }
};
export const resolveAsync = async (value) => {
    return await Promise.resolve(value);
};
export const hasWindow = () => {
    return typeof window !== "undefined";
};
export const hasDocument = () => {
    return typeof document !== "undefined";
};
export const hasLocalStorage = () => {
    if (!hasWindow()) {
        return false;
    }
    try {
        const storage = window.localStorage;
        const key = "__echojs_persist_test__";
        storage.setItem(key, "1");
        storage.removeItem(key);
        return true;
    }
    catch {
        return false;
    }
};
export const hasSessionStorage = () => {
    if (!hasWindow()) {
        return false;
    }
    try {
        const storage = window.sessionStorage;
        const key = "__echojs_persist_test__";
        storage.setItem(key, "1");
        storage.removeItem(key);
        return true;
    }
    catch {
        return false;
    }
};
export const hasIndexedDB = () => {
    return hasWindow() && "indexedDB" in window;
};
//# sourceMappingURL=utils.js.map