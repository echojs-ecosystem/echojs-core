import { signal } from "@echojs-ecosystem/reactivity";
import { debounce } from "./debounce";
import { hydrateFromStorage, resolveSnapshot } from "./hydration";
import { isRecordExpired } from "./record";
import { createJsonSerializer } from "./serializer";
import { saveToStorage } from "./save";
import type {
  PersistController,
  PersistOptions,
  PersistRecord,
  Persistable,
  Serializer,
  StorageAdapter,
} from "./types";
import { resolveAsync } from "./utils";

export const createPersist = <Value, Snapshot = Value>(
  target: Persistable<Value>,
  adapter: StorageAdapter,
  options: PersistOptions<Value, Snapshot>,
): PersistController<Value, Snapshot> => {
  const version = options.version ?? 1;
  const serializer =
    options.serializer ?? (createJsonSerializer<PersistRecord<Snapshot>>() as Serializer<PersistRecord<Snapshot>>);
  const select = options.select ?? ((value: Value) => value as unknown as Snapshot);
  const merge =
    options.merge ?? ((currentValue: Value, snapshot: Snapshot) => snapshot as unknown as Value);

  let paused = false;
  let isHydrating = false;
  let targetUnsubscribe: (() => void) | null = null;
  let storageUnsubscribe: (() => void) | null = null;

  const $hydrated = signal(false);
  const $pending = signal(false);
  const $error = signal<unknown | null>(null);

  const runSave = async (force = false): Promise<void> => {
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
    } catch (error) {
      $error.set(error);
      options.onError?.(error);
      throw error;
    } finally {
      $pending.set(false);
    }
  };

  const debouncedSave =
    options.debounce != null && options.debounce > 0
      ? debounce(() => {
          void runSave();
        }, options.debounce)
      : null;

  const scheduleSave = (): void => {
    if (paused || isHydrating) {
      return;
    }
    if (debouncedSave) {
      debouncedSave();
      return;
    }
    void runSave();
  };

  const attachTargetSubscription = (): void => {
    if (targetUnsubscribe) {
      return;
    }
    targetUnsubscribe = target.subscribe(() => {
      scheduleSave();
    });
  };

  const applyStorageValue = async (raw: string | null): Promise<void> => {
    if (raw == null) {
      return;
    }

    isHydrating = true;
    try {
      const record = serializer.deserialize(raw) as PersistRecord<Snapshot>;
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
    } finally {
      isHydrating = false;
    }
  };

  const attachStorageSubscription = (): void => {
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

  const hydrate = async (): Promise<void> => {
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
    } catch (error) {
      $error.set(error);
      options.onError?.(error);
    } finally {
      isHydrating = false;
      $hydrated.set(true);
      $pending.set(false);
      attachTargetSubscription();
      attachStorageSubscription();
    }
  };

  const clear = async (): Promise<void> => {
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
