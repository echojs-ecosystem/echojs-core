import { describe, expect, it, vi } from "vitest";
import { createPersistRecord } from "../src/core/record.js";
import { jsonSerializer } from "../src/core/serializer.js";
import { createMemoryStorageAdapter } from "../src/adapters/memory.js";
import { setupMemoryPersist } from "./helpers/setup-memory-persist.js";

describe("ttl", () => {
  it("expires record on hydrate and removes it", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-01-01T00:00:00Z"));

    const adapter = createMemoryStorageAdapter();
    const record = createPersistRecord("old", { version: 1, ttl: 1000 });
    adapter.setItem("draft", jsonSerializer.serialize(record));

    vi.setSystemTime(new Date("2020-01-01T00:00:10Z"));

    const { store, wait } = setupMemoryPersist("initial", { key: "draft" }, adapter);
    await wait();

    expect(store.value()).toBe("initial");
    expect(adapter.getItem("draft")).toBeNull();

    vi.useRealTimers();
  });

  it("stores expiresAt when ttl is set", async () => {
    const { store, adapter, wait } = setupMemoryPersist(1, { key: "counter", ttl: 5000, saveInitial: true });
    await wait();

    const record = jsonSerializer.deserialize(adapter.getItem("counter")!) as {
      expiresAt?: number;
    };
    expect(record.expiresAt).toBeTypeOf("number");
    expect(store.value()).toBe(1);
  });
});
