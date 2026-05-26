import { describe, expect, it } from "vitest";
import { createStore } from "../src/index.js";

describe("reset()", () => {
  it("restores initial value", () => {
    const counter = createStore(0);
    counter.set(5);
    counter.reset();
    expect(counter.value()).toBe(0);
  });

  it("reseted emits on reset", () => {
    const counter = createStore(0);
    counter.set(5);

    const payloads: Array<{ value: number; prevValue: number }> = [];
    counter.reseted.watch((payload) => {
      payloads.push(payload);
    });

    counter.reset();
    expect(payloads).toEqual([{ value: 0, prevValue: 5 }]);
  });
});
