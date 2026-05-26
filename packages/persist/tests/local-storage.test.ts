// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import { createStore } from "@echojs/store";
import { withLocalStorage } from "../src/extensions/with-local-storage.js";
import { flushMicrotasks } from "./helpers/fake-targets.js";

describe("localStorage adapter", () => {
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
