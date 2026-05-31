import { describe, expect, it } from "vitest";

import { createStore } from "./create-store";
import { withDebug } from "./with-debug";

describe("withDebug()", () => {
  it("does not throw", () => {
    const counter = createStore(0, { name: "counter" }).extend(withDebug());

    expect(() => {
      counter.set(1);
    }).not.toThrow();
    expect(counter.debugName).toBe("counter");
  });
});
