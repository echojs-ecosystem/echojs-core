import { describe, expect, it } from "vitest";
import { createStore } from "../src/index";

describe("set() / update()", () => {
  it("set updates value", () => {
    const counter = createStore(0);
    counter.set(1);
    expect(counter.value()).toBe(1);
  });

  it("update updates value", () => {
    const counter = createStore(0);
    counter.update((value) => value + 1);
    expect(counter.value()).toBe(1);
  });
});
