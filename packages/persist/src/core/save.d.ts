import type { PersistOptions, PersistRecord, Persistable, Serializer, StorageAdapter } from "./types";
export declare const saveToStorage: <Value, Snapshot>(target: Persistable<Value>, adapter: StorageAdapter, options: PersistOptions<Value, Snapshot> & {
    serializer: Serializer<PersistRecord<Snapshot>>;
    select: (value: Value) => Snapshot;
    version: number;
}) => Promise<void>;
//# sourceMappingURL=save.d.ts.map