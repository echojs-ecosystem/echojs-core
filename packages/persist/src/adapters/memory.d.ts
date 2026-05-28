import type { StorageAdapter } from "../core/types";
export type MemoryStorageAdapter = StorageAdapter & {
    clear(): void;
    entries(): ReadonlyMap<string, string>;
};
export declare const createMemoryStorageAdapter: () => MemoryStorageAdapter;
//# sourceMappingURL=memory.d.ts.map