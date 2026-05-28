import { hasIndexedDB, warnDev } from "../core/utils";
import { createMemoryStorageAdapter } from "./memory";
const openDatabase = (dbName, storeName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName);
            }
        };
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error ?? new Error("indexedDB.open failed"));
        };
    });
};
const withStore = async (dbName, storeName, mode, run) => {
    const db = await openDatabase(dbName, storeName);
    return await new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = run(store);
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error ?? new Error("indexedDB request failed"));
        };
        transaction.oncomplete = () => {
            db.close();
        };
    });
};
export const createIndexedDBStorageAdapter = (options = {}) => {
    if (!hasIndexedDB()) {
        warnDev("indexedDB is unavailable; falling back to in-memory storage.");
        return createMemoryStorageAdapter();
    }
    const dbName = options.dbName ?? "echojs";
    const storeName = options.storeName ?? "persist";
    return {
        kind: "indexedDB",
        async getItem(key) {
            const value = await withStore(dbName, storeName, "readonly", (store) => {
                return store.get(key);
            });
            return value ?? null;
        },
        async setItem(key, value) {
            await withStore(dbName, storeName, "readwrite", (store) => {
                return store.put(value, key);
            });
        },
        async removeItem(key) {
            await withStore(dbName, storeName, "readwrite", (store) => {
                return store.delete(key);
            });
        },
    };
};
//# sourceMappingURL=indexed-db.js.map