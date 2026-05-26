import type { PersistRecord } from "./types";

export const createPersistRecord = <Snapshot>(
  data: Snapshot,
  options: {
    version: number;
    ttl?: number;
    createdAt?: number;
  },
): PersistRecord<Snapshot> => {
  const now = Date.now();
  const createdAt = options.createdAt ?? now;

  return {
    version: options.version,
    createdAt,
    updatedAt: now,
    expiresAt: options.ttl != null ? now + options.ttl : undefined,
    data,
  };
};

export const isRecordExpired = (record: PersistRecord<unknown>): boolean => {
  if (record.expiresAt == null) {
    return false;
  }
  return Date.now() >= record.expiresAt;
};

export const touchPersistRecord = <Snapshot>(
  record: PersistRecord<Snapshot>,
  data: Snapshot,
  options: { version: number; ttl?: number },
): PersistRecord<Snapshot> => {
  const now = Date.now();
  return {
    version: options.version,
    createdAt: record.createdAt,
    updatedAt: now,
    expiresAt: options.ttl != null ? now + options.ttl : record.expiresAt,
    data,
  };
};
