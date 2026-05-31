import { describe, expectTypeOf, it } from "vitest";

import { createStore } from "./create-store";

describe("attachExtend types", () => {
  it("adds extension methods to the store type", () => {
    const store = createStore(0).extend((s) => ({
      increment() {
        s.update((value: number) => value + 1);
      },
    }));

    expectTypeOf(store.increment).toBeFunction();
    expectTypeOf(store.value()).toBeNumber();
  });

  it("adds fields via extend", () => {
    const store = createStore(0).extend(() => ({
      label: "counter" as const,
    }));

    expectTypeOf(store.label).toEqualTypeOf<"counter">();
  });
});
