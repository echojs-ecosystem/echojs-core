import { describe, expect, it } from "vitest";
import { createStore, readonly, withReadonly } from "../src/index";

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

describe("withReadonly()", () => {
  it("blocks mutating methods on the same store", () => {
    const counter = createStore(0).extend(withReadonly());

    expect(counter.kind).toBe("readonly-store");
    expect(() => counter.set(1)).toThrow(/readonly/i);
    expect(() => counter.update((v) => v + 1)).toThrow(/readonly/i);
    expect(() => counter.reset()).toThrow(/readonly/i);
  });
});
