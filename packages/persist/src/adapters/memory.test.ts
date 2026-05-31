import { describe, expect, it, vi } from "vitest";

import { createMemoryStorageAdapter } from "./memory";

describe("createMemoryStorageAdapter", () => {
  it("getItem returns null for missing key", () => {
    const adapter = createMemoryStorageAdapter();
    expect(adapter.getItem("missing")).toBeNull();
  });

  it("setItem and getItem round-trip", () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem("key", "value");
    expect(adapter.getItem("key")).toBe("value");
  });

  it("removeItem deletes key and notifies subscribers", () => {
    const adapter = createMemoryStorageAdapter();
    const listener = vi.fn();

    adapter.setItem("key", "value");
    adapter.subscribe("key", listener);
    adapter.removeItem("key");

    expect(adapter.getItem("key")).toBeNull();
    expect(listener).toHaveBeenCalledWith(null);
  });

  it("subscribe notifies on setItem", () => {
    const adapter = createMemoryStorageAdapter();
    const listener = vi.fn();

    adapter.subscribe("key", listener);
    adapter.setItem("key", "a");
    adapter.setItem("key", "b");

    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenLastCalledWith("b");
  });

  it("unsubscribe stops notifications and cleans up listener set", () => {
    const adapter = createMemoryStorageAdapter();
    const listener = vi.fn();

    const unsubscribe = adapter.subscribe("key", listener);
    unsubscribe();
    adapter.setItem("key", "value");

    expect(listener).not.toHaveBeenCalled();
  });

  it("clear removes all entries and notifies subscribers", () => {
    const adapter = createMemoryStorageAdapter();
    const listenerA = vi.fn();
    const listenerB = vi.fn();

    adapter.setItem("a", "1");
    adapter.setItem("b", "2");
    adapter.subscribe("a", listenerA);
    adapter.subscribe("b", listenerB);

    adapter.clear();

    expect(adapter.getItem("a")).toBeNull();
    expect(adapter.getItem("b")).toBeNull();
    expect(listenerA).toHaveBeenCalledWith(null);
    expect(listenerB).toHaveBeenCalledWith(null);
    expect(adapter.entries().size).toBe(0);
  });

  it("entries returns underlying map", () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem("x", "1");
    expect(adapter.entries().get("x")).toBe("1");
  });
});
