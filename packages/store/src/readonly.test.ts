import { describe, expect, it } from "vitest";

import { createStore } from "./create-store";
import { readonly } from "./readonly";

describe("readonly()", () => {
  it("hides mutating methods", () => {
    const counter = createStore(0);
    const readonlyCounter = readonly(counter);

    expect(readonlyCounter.kind).toBe("readonly-store");
    expect(readonlyCounter.value()).toBe(0);
    expect((readonlyCounter as { set?: unknown }).set).toBeUndefined();
    expect((readonlyCounter as { update?: unknown }).update).toBeUndefined();
    expect((readonlyCounter as { reset?: unknown }).reset).toBeUndefined();
  });

  it("still receives source updates", () => {
    const counter = createStore(0);
    const readonlyCounter = readonly(counter);

    counter.set(2);
    expect(readonlyCounter.value()).toBe(2);
  });
});
