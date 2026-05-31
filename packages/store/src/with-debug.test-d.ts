import { describe, expectTypeOf, it } from "vitest";

import { createStore } from "./create-store";
import { withDebug } from "./with-debug";

describe("withDebug types", () => {
  it("adds debugName to the store", () => {
    const counter = createStore(0, { name: "counter" }).extend(withDebug());

    expectTypeOf(counter.debugName).toEqualTypeOf<string | undefined>();
  });
});
