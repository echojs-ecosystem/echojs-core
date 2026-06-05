// @vitest-environment jsdom
import { describe, expect, it, beforeAll } from "vitest";
import "fake-indexeddb/auto";
import { createStore } from "@echojs-ecosystem/store";

import { flushMicrotasks } from "../test-utils";
import { withIndexedDB } from "./with-indexed-db";

describe("withIndexedDB", () => {
  beforeAll(() => {
    if (!globalThis.indexedDB) {
      throw new Error("indexedDB is not available in test environment");
    }
  });

  it("hydrates and saves asynchronously", async () => {
    const store = createStore<Record<string, string>>({}).extend(
      withIndexedDB({
        key: "products-cache",
        dbName: "echojs-test",
        storeName: "kv",
        hydrate: false,
      }),
    );

    expect(store.persist.$pending.value()).toBe(false);

    const hydratePromise = store.persist.hydrate();
    expect(store.persist.$pending.value()).toBe(true);
    await hydratePromise;
    expect(store.persist.$hydrated.value()).toBe(true);

    store.set({ a: "1" });
    await store.persist.save();
    await flushMicrotasks();

    const restored = createStore<Record<string, string>>({}).extend(
      withIndexedDB({
        key: "products-cache",
        dbName: "echojs-test",
        storeName: "kv",
        hydrate: false,
      }),
    );
    await restored.persist.hydrate();
    expect(restored.value()).toEqual({ a: "1" });
  });
});
