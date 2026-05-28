import type { PersistRecord } from "./types";
export declare const createPersistRecord: <Snapshot>(data: Snapshot, options: {
    version: number;
    ttl?: number;
    createdAt?: number;
}) => PersistRecord<Snapshot>;
export declare const isRecordExpired: (record: PersistRecord<unknown>) => boolean;
export declare const touchPersistRecord: <Snapshot>(record: PersistRecord<Snapshot>, data: Snapshot, options: {
    version: number;
    ttl?: number;
}) => PersistRecord<Snapshot>;
//# sourceMappingURL=record.d.ts.map