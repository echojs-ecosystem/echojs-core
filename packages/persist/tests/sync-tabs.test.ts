// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import { createStore } from "@echojs/store";
import { createPersistRecord } from "../src/core/record.js";
import { jsonSerializer } from "../src/core/serializer.js";
import { withLocalStorage } from "../src/extensions/with-local-storage.js";
import { flushMicrotasks } from "./helpers/fake-targets.js";

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
