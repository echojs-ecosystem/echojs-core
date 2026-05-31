import { describe, expect, it } from "vitest";

import { createStore } from "./create-store";

describe("attachExtend()", () => {
  it("adds methods via extend()", () => {
    const counter = createStore(0).extend((store) => ({
      increment() {
        store.update((value) => value + 1);
      },
    }));

    counter.increment();
    expect(counter.value()).toBe(1);
  });

  it("supports chaining", () => {
    const counter = createStore(0).extend((store) => ({
      increment() {
        store.update((value) => value + 1);
      },
    }));

    const extended = counter.extend(() => ({
      label: "counter" as const,
    }));

    extended.increment();
    expect(extended.value()).toBe(1);
    expect(extended.label).toBe("counter");
  });

  it("throws on key conflict", () => {
    const counter = createStore(0);

    expect(() =>
      counter.extend(() => ({
        value() {
          return 1;
        },
      })),
    ).toThrow(/conflict/i);
  });
});
