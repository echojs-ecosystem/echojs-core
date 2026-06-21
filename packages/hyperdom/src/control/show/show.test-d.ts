import { describe, expectTypeOf, it } from "vitest";

import { h } from "../../hyperscript/h";
import type { Child } from "../../core/types";
import { Show } from "./show";

describe("Show types", () => {
  it("returns reactive child factory", () => {
    expectTypeOf(Show(() => true, () => h("div", null, "a"))).toEqualTypeOf<() => Child>();
    expectTypeOf(
      Show(() => true, () => h("div", null, "a"), () => h("div", null, "b")),
    ).toEqualTypeOf<() => Child>();
  });
});
