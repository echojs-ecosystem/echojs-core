import { describe, expectTypeOf, it } from "vitest";

import { createModel, isInModelContext } from "./create-model";

describe("createModel types", () => {
  it("infers model factory return type", () => {
    const make = createModel(() => ({ count: 1 as const }), "CounterModel");

    expectTypeOf(make).returns.toEqualTypeOf<{ count: 1 }>();
    expectTypeOf(isInModelContext).returns.toEqualTypeOf<boolean>();
  });
});
