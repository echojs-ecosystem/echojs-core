import { describe, expect, it } from "vitest";
import { setupMemoryPersist } from "./helpers/setup-memory-persist";
import { flushMicrotasks } from "./helpers/fake-targets";

describe("clear()", () => {
  it("removes item from storage without resetting target", async () => {
    const { store, adapter, wait, save } = setupMemoryPersist(10, { key: "counter", saveInitial: true });
    await wait();

    store.set(20);
    await save();
    expect(adapter.getItem("counter")).not.toBeNull();

    await store.persist.clear();
    expect(adapter.getItem("counter")).toBeNull();
    expect(store.value()).toBe(20);
  });
});
