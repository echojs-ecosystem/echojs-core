import { createPersistRecord, isRecordExpired } from "./record";
import type {
  MigrateContext,
  PersistOptions,
  PersistRecord,
  Persistable,
  Serializer,
  StorageAdapter,
} from "./types";
import { resolveAsync } from "./utils";

export type HydrationResult<Value, Snapshot> =
  | { kind: "empty" }
  | { kind: "expired" }
  | { kind: "invalid" }
  | { kind: "applied"; value: Value; snapshot: Snapshot };

export const readPersistRecord = async <Snapshot>(
  adapter: StorageAdapter,
  key: string,
  serializer: Serializer<PersistRecord<Snapshot>>,
): Promise<PersistRecord<Snapshot> | null> => {
  const raw = await resolveAsync(adapter.getItem(key));
  if (raw == null || raw === "") {
    return null;
  }

  const parsed = serializer.deserialize(raw) as PersistRecord<Snapshot>;
  if (
    parsed == null ||
    typeof parsed !== "object" ||
    typeof parsed.version !== "number" ||
    typeof parsed.createdAt !== "number" ||
    typeof parsed.updatedAt !== "number" ||
    !("data" in parsed)
  ) {
    throw new Error(`Invalid persist record for key "${key}"`);
  }

  return parsed;
};

export const resolveSnapshot = <Value, Snapshot>(
  record: PersistRecord<Snapshot>,
  options: Pick<PersistOptions<Value, Snapshot>, "version" | "migrate" | "validate">,
): Snapshot | null => {
  const currentVersion = options.version ?? 1;

  let snapshot: unknown = record.data;

  if (record.version !== currentVersion) {
    if (!options.migrate) {
      return null;
    }
    const ctx: MigrateContext = {
      data: snapshot,
      version: record.version,
      currentVersion,
    };
    snapshot = options.migrate(ctx);
  }

  if (options.validate && !options.validate(snapshot)) {
    return null;
  }

  return snapshot as Snapshot;
};

export const hydrateFromStorage = async <Value, Snapshot>(
  target: Persistable<Value>,
  adapter: StorageAdapter,
  options: PersistOptions<Value, Snapshot> & {
    serializer: Serializer<PersistRecord<Snapshot>>;
    select: (value: Value) => Snapshot;
    merge: (currentValue: Value, snapshot: Snapshot) => Value;
  },
): Promise<HydrationResult<Value, Snapshot>> => {
  const record = await readPersistRecord<Snapshot>(adapter, options.key, options.serializer);

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

export const createInitialRecord = <Snapshot>(
  snapshot: Snapshot,
  options: { version: number; ttl?: number },
): PersistRecord<Snapshot> => {
  return createPersistRecord(snapshot, options);
};
