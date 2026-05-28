import { createPersistRecord, touchPersistRecord } from "./record";
import { readPersistRecord } from "./hydration";
import { resolveAsync } from "./utils";
export const saveToStorage = async (target, adapter, options) => {
    const value = target.value();
    const snapshot = options.select(value);
    if (snapshot == null) {
        await resolveAsync(adapter.removeItem(options.key));
        options.onSave?.({ value, snapshot });
        return;
    }
    const existing = await readPersistRecord(adapter, options.key, options.serializer).catch(() => null);
    const record = existing == null
        ? createPersistRecord(snapshot, {
            version: options.version,
            ttl: options.ttl,
        })
        : touchPersistRecord(existing, snapshot, {
            version: options.version,
            ttl: options.ttl,
        });
    const serialized = options.serializer.serialize(record);
    await resolveAsync(adapter.setItem(options.key, serialized));
    options.onSave?.({ value, snapshot });
};
//# sourceMappingURL=save.js.map