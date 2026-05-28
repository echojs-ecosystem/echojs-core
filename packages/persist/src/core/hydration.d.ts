import type { PersistOptions, PersistRecord, Persistable, Serializer, StorageAdapter } from "./types";
export type HydrationResult<Value, Snapshot> = {
    kind: "empty";
} | {
    kind: "expired";
} | {
    kind: "invalid";
} | {
    kind: "applied";
    value: Value;
    snapshot: Snapshot;
};
export declare const readPersistRecord: <Snapshot>(adapter: StorageAdapter, key: string, serializer: Serializer<PersistRecord<Snapshot>>) => Promise<PersistRecord<Snapshot> | null>;
export declare const resolveSnapshot: <Value, Snapshot>(record: PersistRecord<Snapshot>, options: Pick<PersistOptions<Value, Snapshot>, "version" | "migrate" | "validate">) => Snapshot | null;
export declare const hydrateFromStorage: <Value, Snapshot>(target: Persistable<Value>, adapter: StorageAdapter, options: PersistOptions<Value, Snapshot> & {
    serializer: Serializer<PersistRecord<Snapshot>>;
    select: (value: Value) => Snapshot;
    merge: (currentValue: Value, snapshot: Snapshot) => Value;
}) => Promise<HydrationResult<Value, Snapshot>>;
export declare const createInitialRecord: <Snapshot>(snapshot: Snapshot, options: {
    version: number;
    ttl?: number;
}) => PersistRecord<Snapshot>;
//# sourceMappingURL=hydration.d.ts.map