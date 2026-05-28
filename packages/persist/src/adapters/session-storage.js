import { hasSessionStorage, warnDev } from "../core/utils";
import { createMemoryStorageAdapter } from "./memory";
export const createSessionStorageAdapter = () => {
    if (!hasSessionStorage()) {
        warnDev("sessionStorage is unavailable; falling back to in-memory storage.");
        return createMemoryStorageAdapter();
    }
    const storage = window.sessionStorage;
    return {
        kind: "sessionStorage",
        getItem(key) {
            return storage.getItem(key);
        },
        setItem(key, value) {
            storage.setItem(key, value);
        },
        removeItem(key) {
            storage.removeItem(key);
        },
    };
};
//# sourceMappingURL=session-storage.js.map