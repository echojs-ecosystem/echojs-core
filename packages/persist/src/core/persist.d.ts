import type { PersistController, PersistOptions, Persistable, StorageAdapter } from "./types";
export declare const createPersist: <Value, Snapshot = Value>(target: Persistable<Value>, adapter: StorageAdapter, options: PersistOptions<Value, Snapshot>) => PersistController<Value, Snapshot>;
//# sourceMappingURL=persist.d.ts.map