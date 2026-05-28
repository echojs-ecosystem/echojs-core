import { signal } from "@echojs-ecosystem/reactivity";
import { debounce } from "./debounce";
import { hydrateFromStorage, resolveSnapshot } from "./hydration";
import { isRecordExpired } from "./record";
import { createJsonSerializer } from "./serializer";
import { saveToStorage } from "./save";
import { resolveAsync } from "./utils";
export const createPersist = (target, adapter, options) => {
    const version = options.version ?? 1;
    const serializer = options.serializer ?? createJsonSerializer();
    const select = options.select ?? ((value) => value);
    const merge = options.merge ?? ((currentValue, snapshot) => snapshot);
    let paused = false;
    let isHydrating = false;
    let targetUnsubscribe = null;
    let storageUnsubscribe = null;
    const $hydrated = signal(false);
    const $pending = signal(false);
    const $error = signal(null);
    const runSave = async (force = false) => {
        if (paused || (!force && isHydrating)) {
            return;
        }
        $pending.set(true);
        try {
            await saveToStorage(target, adapter, {
                ...options,
                serializer,
                select,
                version,
            });
            $error.set(null);
        }
        catch (error) {
            $error.set(error);
            options.onError?.(error);
            throw error;
        }
        finally {
            $pending.set(false);
        }
    };
    const debouncedSave = options.debounce != null && options.debounce > 0
        ? debounce(() => {
            void runSave();
        }, options.debounce)
        : null;
    const scheduleSave = () => {
        if (paused || isHydrating) {
            return;
        }
        if (debouncedSave) {
            debouncedSave();
            return;
        }
        void runSave();
    };
    const attachTargetSubscription = () => {
        if (targetUnsubscribe) {
            return;
        }
        targetUnsubscribe = target.subscribe(() => {
            scheduleSave();
        });
    };
    const applyStorageValue = async (raw) => {
        if (raw == null) {
            return;
        }
        isHydrating = true;
        try {
            const record = serializer.deserialize(raw);
            if (record == null || typeof record !== "object") {
                return;
            }
            if (isRecordExpired(record)) {
                await resolveAsync(adapter.removeItem(options.key));
                return;
            }
            const snapshot = resolveSnapshot(record, {
                version,
                migrate: options.migrate,
                validate: options.validate,
            });
            if (snapshot == null) {
                return;
            }
            const value = merge(target.value(), snapshot);
            target.set(value);
            options.onHydrate?.({ value, snapshot });
        }
        finally {
            isHydrating = false;
        }
    };
    const attachStorageSubscription = () => {
        if (!options.syncTabs || !adapter.subscribe || storageUnsubscribe) {
            return;
        }
        storageUnsubscribe = adapter.subscribe(options.key, (value) => {
            if (paused) {
                return;
            }
            void applyStorageValue(value);
        });
    };
    const hydrate = async () => {
        isHydrating = true;
        $pending.set(true);
        try {
            const result = await hydrateFromStorage(target, adapter, {
                ...options,
                serializer,
                select,
                merge,
                version,
            });
            if (result.kind === "empty" && options.saveInitial) {
                await runSave(true);
            }
            $error.set(null);
        }
        catch (error) {
            $error.set(error);
            options.onError?.(error);
        }
        finally {
            isHydrating = false;
            $hydrated.set(true);
            $pending.set(false);
            attachTargetSubscription();
            attachStorageSubscription();
        }
    };
    const clear = async () => {
        debouncedSave?.cancel();
        const wasPaused = paused;
        paused = true;
        await resolveAsync(adapter.removeItem(options.key));
        paused = wasPaused;
    };
    return {
        key: options.key,
        $hydrated,
        $pending,
        $error,
        hydrate,
        save: runSave,
        clear,
        pause() {
            paused = true;
            debouncedSave?.cancel();
        },
        resume() {
            paused = false;
        },
    };
};
//# sourceMappingURL=persist.js.map