import { describe, expectTypeOf, it } from "vitest";

import { h } from "../../hyperscript/h";
import type { Child } from "../../core/types";
import { displayRegion } from "./display-region";

describe("displayRegion types", () => {
  it("returns Child", () => {
    expectTypeOf(displayRegion(() => true, () => h("div", null, "x"))).toEqualTypeOf<Child>();
  });
});
