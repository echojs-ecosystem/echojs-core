import { describe, expect, it } from "vitest";
import { createStore, withActions, withDebug } from "../src/index.js";

describe("extend()", () => {
  it("adds methods", () => {
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

describe("withActions()", () => {
  it("adds actions", () => {
    const counter = createStore(0).extend(
      withActions({
        increment: (store) => () => store.update((v: number) => v + 1),
        add: (store) => (amount: number) => store.update((v: number) => v + amount),
      }),
    );

    counter.increment();
    expect(counter.value()).toBe(1);

    counter.add(4);
    expect(counter.value()).toBe(5);
  });
});

describe("withDebug()", () => {
  it("does not throw", () => {
    const counter = createStore(0, { name: "counter" }).extend(withDebug());

    expect(() => {
      counter.set(1);
    }).not.toThrow();
    expect(counter.debugName).toBe("counter");
  });
});
