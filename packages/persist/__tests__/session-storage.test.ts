// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import { createStore } from "@echojs/store";
import { withSessionStorage } from "../src/extensions/with-session-storage";
import { flushMicrotasks } from "./helpers/fake-targets";

describe("sessionStorage adapter", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("reads and writes in jsdom", async () => {
    const store = createStore({ search: "", category: null as string | null }).extend(
      withSessionStorage({
        key: "catalog-filters",
        version: 1,
        hydrate: false,
      }),
    );

    await store.persist.hydrate();
    store.set({ search: "echo", category: "ui" });
    await store.persist.save();
    await flushMicrotasks();

    expect(sessionStorage.getItem("catalog-filters")).not.toBeNull();
  });
});
