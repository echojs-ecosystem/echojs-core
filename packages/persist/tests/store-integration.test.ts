import { describe, expect, it } from "vitest";
import { createStore } from "@echojs/store";
import { createMemoryStorageAdapter } from "../src/adapters/memory.js";
import { withStorage } from "../src/core/with-storage.js";
import { flushMicrotasks } from "./helpers/fake-targets.js";

describe("@echojs/store integration", () => {
  it("works with createStore().extend(withMemoryStorage())", async () => {
    const adapter = createMemoryStorageAdapter();

    const theme = createStore("dark", { name: "theme" }).extend(
      withStorage(adapter, {
        key: "app-theme",
        hydrate: false,
      }),
    );

    await theme.persist.hydrate();
    theme.set("light");
    await theme.persist.save();
    await flushMicrotasks();

    const theme2 = createStore("dark").extend(
      withStorage(adapter, {
        key: "app-theme",
        hydrate: false,
      }),
    );
    await theme2.persist.hydrate();

    expect(theme2.value()).toBe("light");
  });

  it("supports manual hydrate", async () => {
    const draft = createStore("").extend(
      withStorage(createMemoryStorageAdapter(), {
        key: "draft",
        hydrate: false,
      }),
    );

    expect(draft.persist.$hydrated.value()).toBe(false);
    await draft.persist.hydrate();
    expect(draft.persist.$hydrated.value()).toBe(true);
  });
});
