import type { Signal } from "@echojs-ecosystem/reactivity";
export type Persistable<Value> = {
    value(): Value;
    set(value: Value): void;
    subscribe(listener: (value: Value, prevValue: Value) => void): () => void;
};
export type Serializer<T> = {
    serialize(value: T): string;
    deserialize(value: string): T;
};
export type PersistRecord<Snapshot> = {
    version: number;
    createdAt: number;
    updatedAt: number;
    expiresAt?: number;
    data: Snapshot;
};
export type MigrateContext = {
    data: unknown;
    version: number;
    currentVersion: number;
};
export type PersistOptions<Value, Snapshot = Value> = {
    key: string;
    version?: number;
    ttl?: number;
    hydrate?: boolean;
    saveInitial?: boolean;
    debounce?: number;
    syncTabs?: boolean;
    serializer?: Serializer<PersistRecord<Snapshot>>;
    select?: (value: Value) => Snapshot;
    merge?: (currentValue: Value, snapshot: Snapshot) => Value;
    migrate?: (ctx: MigrateContext) => Snapshot;
    validate?: (data: unknown) => data is Snapshot;
    onHydrate?: (ctx: {
        value: Value;
        snapshot: Snapshot;
    }) => void;
    onSave?: (ctx: {
        value: Value;
        snapshot: Snapshot;
    }) => void;
    onError?: (error: unknown) => void;
};
export type StorageAdapter = {
    kind: string;
    getItem(key: string): string | null | Promise<string | null>;
    setItem(key: string, value: string): void | Promise<void>;
    removeItem(key: string): void | Promise<void>;
    subscribe?(key: string, listener: (value: string | null) => void): () => void;
};
export type PersistController<Value, Snapshot = Value> = {
    key: string;
    hydrate(): Promise<void> | void;
    save(): Promise<void> | void;
    clear(): Promise<void> | void;
    pause(): void;
    resume(): void;
    $hydrated: Signal<boolean>;
    $pending: Signal<boolean>;
    $error: Signal<unknown | null>;
};
export type PersistExtensionResult<Value, Snapshot = Value> = {
    persist: PersistController<Value, Snapshot>;
};
export type PersistExtension<Value, Snapshot = Value> = (target: Persistable<Value>) => PersistExtensionResult<Value, Snapshot>;
export type CookiePersistOptions<Value, Snapshot = Value> = PersistOptions<Value, Snapshot> & {
    path?: string;
    domain?: string;
    sameSite?: "strict" | "lax" | "none";
    secure?: boolean;
    maxAge?: number;
};
export type IndexedDBPersistOptions<Value, Snapshot = Value> = PersistOptions<Value, Snapshot> & {
    dbName?: string;
    storeName?: string;
};
export type FieldLike<Value> = Persistable<Value> & {
    kind?: "field";
    name?: string;
    reset?(): void;
};
export type FieldArrayLike<Item> = Persistable<Item[]> & {
    kind?: "field-array";
    name?: string;
    push?(item: Item): void;
    remove?(index: number): void;
    reset?(): void;
};
export type PersistableForm<Value extends object> = Persistable<Value> & {
    kind?: "form";
    reset?(): void;
};
export type Extendable<T, R> = T & {
    extend?(extension: (target: T) => R): T & R;
};
//# sourceMappingURL=types.d.ts.map