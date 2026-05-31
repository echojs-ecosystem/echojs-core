import { describe, expect, it, vi } from "vitest";

import { createPersistRecord, isRecordExpired, touchPersistRecord } from "./record";

describe("createPersistRecord", () => {
  it("sets expiresAt when ttl is provided", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-01-01T00:00:00Z"));

    const record = createPersistRecord("data", { version: 1, ttl: 5000 });

    expect(record.expiresAt).toBe(Date.now() + 5000);
    expect(record.data).toBe("data");
    expect(record.version).toBe(1);

    vi.useRealTimers();
  });

  it("omits expiresAt without ttl", () => {
    const record = createPersistRecord(42, { version: 2 });
    expect(record.expiresAt).toBeUndefined();
  });
});

describe("isRecordExpired", () => {
  it("returns false when expiresAt is absent", () => {
    const record = createPersistRecord("x", { version: 1 });
    expect(isRecordExpired(record)).toBe(false);
  });

  it("returns true when current time is past expiresAt", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-01-01T00:00:00Z"));

    const record = createPersistRecord("x", { version: 1, ttl: 1000 });
    vi.setSystemTime(new Date("2020-01-01T00:00:02Z"));

    expect(isRecordExpired(record)).toBe(true);

    vi.useRealTimers();
  });
});

describe("touchPersistRecord", () => {
  it("updates data and refreshed ttl", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-01-01T00:00:00Z"));

    const original = createPersistRecord("old", { version: 1, ttl: 1000 });
    vi.setSystemTime(new Date("2020-01-01T00:00:05Z"));

    const touched = touchPersistRecord(original, "new", { version: 1, ttl: 2000 });

    expect(touched.data).toBe("new");
    expect(touched.createdAt).toBe(original.createdAt);
    expect(touched.expiresAt).toBe(Date.now() + 2000);

    vi.useRealTimers();
  });

  it("preserves expiresAt when ttl is not set on touch", () => {
    const original = createPersistRecord("old", { version: 1, ttl: 5000 });
    const touched = touchPersistRecord(original, "new", { version: 1 });

    expect(touched.expiresAt).toBe(original.expiresAt);
  });
});
