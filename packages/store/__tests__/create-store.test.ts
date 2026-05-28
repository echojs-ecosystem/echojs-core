import { describe, expect, it } from "vitest";
import { createStore } from "../src/index";

describe("createStore()", () => {
  it("returns initial value", () => {
    const counter = createStore(0);
    expect(counter.value()).toBe(0);
    expect(counter.kind).toBe("store");
  });

  it("accepts name option", () => {
    const counter = createStore(0, { name: "counter" });
    expect(counter.name).toBe("counter");
  });

  it("exposes underlying signal as $value", () => {
    const counter = createStore(0);
    expect(counter.$value.value()).toBe(0);
    counter.set(2);
    expect(counter.$value.value()).toBe(2);
  });
});
