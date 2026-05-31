import { describe, expectTypeOf, it } from "vitest";

import { createStore } from "./create-store";
import { withActions } from "./with-actions";
import type { Store } from "./types";

describe("withActions types", () => {
  it("infers action signatures from the factory map", () => {
    const actions = withActions<number, {
      increment: (store: Store<number>) => () => void;
      add: (store: Store<number>) => (amount: number) => void;
    }>({
      increment: (store) => () => store.update((value) => value + 1),
      add: (store) => (amount) => store.update((value) => value + amount),
    });

    const counter = createStore(0).extend(actions);

    expectTypeOf(counter.increment).toBeFunction();
    expectTypeOf(counter.add).toBeCallableWith(5);
    expectTypeOf(counter.value()).toBeNumber();
  });
});
