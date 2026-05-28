import { createIndexedDBStorageAdapter } from "../adapters/indexed-db";
import { withStorage } from "../core/with-storage";
export const withIndexedDB = (options) => {
    const { dbName, storeName, ...persistOptions } = options;
    const adapter = createIndexedDBStorageAdapter({ dbName, storeName });
    return withStorage(adapter, persistOptions);
};
//# sourceMappingURL=with-indexed-db.js.map