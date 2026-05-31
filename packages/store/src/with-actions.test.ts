import { describe, expect, it } from "vitest";

import { createStore } from "./create-store";
import { withActions } from "./with-actions";

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
