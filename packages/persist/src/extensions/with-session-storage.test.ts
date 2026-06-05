// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import { createStore } from "@echojs-ecosystem/store";

import { flushMicrotasks } from "../test-utils";
import { withSessionStorage } from "./with-session-storage";

describe("withSessionStorage", () => {
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
