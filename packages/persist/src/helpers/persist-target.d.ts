import type { Persistable, PersistExtension, PersistExtensionResult } from "../core/types";
export declare const persist: <T extends Persistable<Value>, Value, Snapshot = Value>(target: T, extension: PersistExtension<Value, Snapshot>) => T & PersistExtensionResult<Value, Snapshot>;
export declare const persistField: <Value, Snapshot = Value>(field: Persistable<Value>, extension: PersistExtension<Value, Snapshot>) => Persistable<Value> & PersistExtensionResult<Value, Snapshot>;
export declare const persistFieldArray: <Item, Snapshot = Item[]>(fieldArray: Persistable<Item[]>, extension: PersistExtension<Item[], Snapshot>) => Persistable<Item[]> & PersistExtensionResult<Item[], Snapshot>;
//# sourceMappingURL=persist-target.d.ts.map