import { describe, expect, it } from "vitest";
import { createMemoryStorageAdapter } from "../src/adapters/memory";
import { withStorage } from "../src/core/with-storage";
import { createStore } from "@echojs/store";
import { jsonSerializer } from "../src/core/serializer";

describe("$error and $pending", () => {
  it("writes error to $error on invalid persisted JSON", async () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem("broken", "{not-json");

    const store = createStore(0).extend(
      withStorage(adapter, {
        key: "broken",
        hydrate: false,
        serializer: jsonSerializer as never,
      }),
    );

    await store.persist.hydrate();
    expect(store.persist.$error.value()).not.toBeNull();
  });
});
