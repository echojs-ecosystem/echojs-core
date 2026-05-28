import { createPersistRecord, isRecordExpired } from "./record";
import { resolveAsync } from "./utils";
export const readPersistRecord = async (adapter, key, serializer) => {
    const raw = await resolveAsync(adapter.getItem(key));
    if (raw == null || raw === "") {
        return null;
    }
    const parsed = serializer.deserialize(raw);
    if (parsed == null ||
        typeof parsed !== "object" ||
        typeof parsed.version !== "number" ||
        typeof parsed.createdAt !== "number" ||
        typeof parsed.updatedAt !== "number" ||
        !("data" in parsed)) {
        throw new Error(`Invalid persist record for key "${key}"`);
    }
    return parsed;
};
export const resolveSnapshot = (record, options) => {
    const currentVersion = options.version ?? 1;
    let snapshot = record.data;
    if (record.version !== currentVersion) {
        if (!options.migrate) {
            return null;
        }
        const ctx = {
            data: snapshot,
            version: record.version,
            currentVersion,
        };
        snapshot = options.migrate(ctx);
    }
    if (options.validate && !options.validate(snapshot)) {
        return null;
    }
    return snapshot;
};
export const hydrateFromStorage = async (target, adapter, options) => {
    const record = await readPersistRecord(adapter, options.key, options.serializer);
    if (record == null) {
        return { kind: "empty" };
    }
    if (isRecordExpired(record)) {
        await resolveAsync(adapter.removeItem(options.key));
        return { kind: "expired" };
    }
    const snapshot = resolveSnapshot(record, options);
    if (snapshot == null) {
        return { kind: "invalid" };
    }
    const value = options.merge(target.value(), snapshot);
    target.set(value);
    options.onHydrate?.({ value, snapshot });
    return { kind: "applied", value, snapshot };
};
export const createInitialRecord = (snapshot, options) => {
    return createPersistRecord(snapshot, options);
};
//# sourceMappingURL=hydration.js.map