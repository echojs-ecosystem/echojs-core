import { describe, expect, it, vi } from "vitest";
import { setupMemoryPersist } from "./helpers/setup-memory-persist.js";
import { flushMicrotasks } from "./helpers/fake-targets.js";

describe("debounce", () => {
  it("debounces save", async () => {
    vi.useFakeTimers();

    const { store, adapter, wait } = setupMemoryPersist(0, { key: "counter", debounce: 100 });
    await wait();

    store.set(1);
    store.set(2);
    store.set(3);

    expect(adapter.getItem("counter")).toBeNull();

    await vi.advanceTimersByTimeAsync(100);
    await flushMicrotasks();

    const raw = adapter.getItem("counter");
    expect(raw).not.toBeNull();

    vi.useRealTimers();
  });
});
