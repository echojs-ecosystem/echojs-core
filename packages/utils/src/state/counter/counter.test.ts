import { describe, expect, it } from "vitest";

import { counter as createCounter } from "./counter";

describe("counter", () => {
  it("increments, decrements, and resets", () => {
    const counter = createCounter(0, { min: 0, max: 5 });
    counter.inc();
    expect(counter.value()).toBe(1);
    counter.dec(2);
    expect(counter.value()).toBe(0);
    counter.set(10);
    expect(counter.value()).toBe(5);
    counter.reset();
    expect(counter.value()).toBe(0);
  });
});
