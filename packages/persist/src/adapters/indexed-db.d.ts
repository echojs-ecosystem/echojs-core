import type { StorageAdapter } from "../core/types";
export type IndexedDBAdapterOptions = {
    dbName?: string;
    storeName?: string;
};
export declare const createIndexedDBStorageAdapter: (options?: IndexedDBAdapterOptions) => StorageAdapter;
//# sourceMappingURL=indexed-db.d.ts.map