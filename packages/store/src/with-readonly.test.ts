import { describe, expect, it } from "vitest";

import { createStore } from "./create-store";
import { withReadonly } from "./with-readonly";

describe("withReadonly()", () => {
  it("blocks mutating methods on the same store", () => {
    const counter = createStore(0).extend(withReadonly());

    expect(counter.kind).toBe("readonly-store");
    expect(() => counter.set(1)).toThrow(/readonly/i);
    expect(() => counter.update((v) => v + 1)).toThrow(/readonly/i);
    expect(() => counter.reset()).toThrow(/readonly/i);
  });
});
