import { describe, expect, it } from "vitest";
import { setupMemoryPersist } from "./helpers/setup-memory-persist";
import { flushMicrotasks } from "./helpers/fake-targets";

describe("pause() / resume()", () => {
  it("pause prevents save, resume enables save", async () => {
    const { store, adapter, wait, save } = setupMemoryPersist(0, { key: "counter" });
    await wait();

    store.persist.pause();
    store.set(1);
    await flushMicrotasks();
    expect(adapter.getItem("counter")).toBeNull();

    store.persist.resume();
    store.set(2);
    await save();

    const raw = adapter.getItem("counter");
    expect(raw).not.toBeNull();
  });
});
