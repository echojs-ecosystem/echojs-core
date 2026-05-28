import { describe, expect, it } from "vitest";
import { createMemoryUrlStateAdapter } from "@echojs/url-state";

describe("memory adapter", () => {
  it("get/set/subscribe", () => {
    const adapter = createMemoryUrlStateAdapter("?page=1");
    const calls: string[] = [];
    const unsub = adapter.subscribe(() => calls.push(adapter.getSearch()));

    adapter.setSearch("?page=2");
    expect(adapter.getSearch()).toBe("?page=2");
    expect(calls).toEqual(["?page=2"]);

    unsub();
    adapter.setSearch("?page=3");
    expect(calls).toEqual(["?page=2"]);
  });
});

