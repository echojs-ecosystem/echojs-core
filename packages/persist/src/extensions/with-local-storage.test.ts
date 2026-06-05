// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import { createStore } from "@echojs-ecosystem/store";

import { createPersistRecord } from "../core/record";
import { jsonSerializer } from "../core/serializer";
import { flushMicrotasks } from "../test-utils";
import { withLocalStorage } from "./with-local-storage";

describe("withLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads and writes in jsdom", async () => {
    const store = createStore("dark").extend(
      withLocalStorage({
        key: "theme",
        hydrate: false,
      }),
    );

    await store.persist.hydrate();
    store.set("light");
    await store.persist.save();
    await flushMicrotasks();

    expect(localStorage.getItem("theme")).not.toBeNull();

    const restored = createStore("dark").extend(
      withLocalStorage({
        key: "theme",
        hydrate: false,
      }),
    );
    await restored.persist.hydrate();
    expect(restored.value()).toBe("light");
  });
});

describe("syncTabs", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("updates target on storage event from another tab", async () => {
    const store = createStore(0).extend(
      withLocalStorage({
        key: "counter",
        syncTabs: true,
        hydrate: false,
      }),
    );

    await store.persist.hydrate();
    store.set(1);
    await flushMicrotasks();

    const record = createPersistRecord(99, { version: 1 });
    localStorage.setItem("counter", jsonSerializer.serialize(record));

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "counter",
        newValue: jsonSerializer.serialize(record),
        storageArea: localStorage,
      }),
    );

    await flushMicrotasks();
    expect(store.value()).toBe(99);
  });
});
