import { describe, expect, it, beforeEach } from "vitest";

import { localStorage as createLocalStorage } from "./local-storage";

describe("localStorage", () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  it("persists values", () => {
    const storage = createLocalStorage("echo-test", { count: 0 });
    storage.set({ count: 2 });
    expect(storage.value()).toEqual({ count: 2 });
    expect(globalThis.localStorage.getItem("echo-test")).toContain("2");
    storage.remove();
    expect(storage.value()).toEqual({ count: 0 });
    storage.dispose();
  });

  it("syncs from cross-tab storage events", () => {
    const storage = createLocalStorage("echo-sync", { count: 0 });
    storage.set({ count: 1 });

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "echo-sync",
        newValue: JSON.stringify({ count: 5 }),
        storageArea: globalThis.localStorage,
      }),
    );
    expect(storage.value()).toEqual({ count: 5 });

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "echo-sync",
        newValue: null,
        storageArea: globalThis.localStorage,
      }),
    );
    expect(storage.value()).toEqual({ count: 0 });
    storage.dispose();
  });

  it("uses custom serialize and deserialize", () => {
    const storage = createLocalStorage("echo-custom", 0, {
      serialize: (value) => `v:${value}`,
      deserialize: (raw) => Number(raw.slice(2)),
    });

    storage.set(42);
    expect(globalThis.localStorage.getItem("echo-custom")).toBe("v:42");
    expect(storage.value()).toBe(42);
    storage.dispose();
  });

  it("falls back to initial on corrupt stored value", () => {
    globalThis.localStorage.setItem("echo-corrupt", "not-json");
    const storage = createLocalStorage("echo-corrupt", { ok: true });
    expect(storage.value()).toEqual({ ok: true });
    storage.dispose();
  });
});
