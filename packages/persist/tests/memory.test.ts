import { describe, expect, it } from "vitest";
import { createPersistRecord } from "../src/core/record.js";
import { jsonSerializer } from "../src/core/serializer.js";
import { createMemoryStorageAdapter } from "../src/adapters/memory.js";
import { setupMemoryPersist } from "./helpers/setup-memory-persist.js";

describe("memory persistence (core)", () => {
  it("hydrates from empty storage", async () => {
    const { store, adapter, wait } = setupMemoryPersist(0, { key: "counter" });
    await wait();
    expect(store.value()).toBe(0);
    expect(adapter.getItem("counter")).toBeNull();
    expect(store.persist.$hydrated.value()).toBe(true);
  });

  it("hydrates from existing storage", async () => {
    const adapter = createMemoryStorageAdapter();
    const record = createPersistRecord(42, { version: 1 });
    adapter.setItem("counter", jsonSerializer.serialize(record));

    const { store, wait } = setupMemoryPersist(0, { key: "counter" }, adapter);
    await wait();
    expect(store.value()).toBe(42);
  });

  it("saves on target change", async () => {
    const { store, adapter, wait, save } = setupMemoryPersist(0, { key: "counter" });
    await wait();

    store.set(7);
    await save();

    const raw = adapter.getItem("counter");
    expect(raw).not.toBeNull();
    const record = jsonSerializer.deserialize(raw!) as { data: number };
    expect(record.data).toBe(7);
  });

  it("saveInitial false does not write empty storage", async () => {
    const { adapter, wait } = setupMemoryPersist(0, { key: "counter", saveInitial: false });
    await wait();
    expect(adapter.getItem("counter")).toBeNull();
  });

  it("saveInitial true writes initial value", async () => {
    const { adapter, wait } = setupMemoryPersist(5, { key: "counter", saveInitial: true });
    await wait();
    const record = jsonSerializer.deserialize(adapter.getItem("counter")!) as { data: number };
    expect(record.data).toBe(5);
  });
});
