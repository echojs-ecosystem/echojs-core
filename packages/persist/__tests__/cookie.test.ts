// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { createStore } from "@echojs/store";
import { withCookie } from "../src/extensions/with-cookie";
import { flushMicrotasks } from "./helpers/fake-targets";

describe("cookie adapter", () => {
  it("set/get/remove in jsdom", async () => {
    const store = createStore<string | null>(null, { name: "token" }).extend(
      withCookie({
        key: "access-token",
        path: "/",
        sameSite: "lax",
        secure: false,
        hydrate: false,
      }),
    );

    await store.persist.hydrate();
    store.set("secret");
    await store.persist.save();
    await flushMicrotasks();

    expect(document.cookie).toContain("access-token=");

    await store.persist.clear();
    expect(document.cookie.includes("access-token=secret")).toBe(false);
  });

  it("set(null) removes cookie instead of persisting empty record", async () => {
    const store = createStore<string | null>(null, { name: "token" }).extend(
      withCookie({
        key: "access-token",
        path: "/",
        sameSite: "lax",
        secure: false,
        hydrate: false,
      }),
    );

    await store.persist.hydrate();
    store.set("secret");
    await store.persist.save();
    await flushMicrotasks();
    expect(document.cookie).toContain("access-token=");

    store.set(null);
    await store.persist.save();
    await flushMicrotasks();
    expect(document.cookie.includes("access-token=secret")).toBe(false);
  });
});
