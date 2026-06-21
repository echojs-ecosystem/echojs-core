import { describe, expectTypeOf, it } from "vitest";

import { h } from "../../hyperscript/h";
import type { Child } from "../../core/types";
import { If, IfBuilder } from "./if";

describe("If types", () => {
  it("IfElse returns IfBuilder", () => {
    expectTypeOf(If(() => true, () => null).IfElse(() => false, () => null)).toEqualTypeOf<
      IfBuilder
    >();
  });

  it("Else and End return reactive child factory", () => {
    const withElse = If(() => true, () => h("div", null, "a"))
      .IfElse(() => false, () => h("div", null, "b"))
      .Else(() => h("div", null, "c"));

    const withEnd = If(() => true, () => h("div", null, "a")).End();

    expectTypeOf(withElse).toEqualTypeOf<() => Child>();
    expectTypeOf(withEnd).toEqualTypeOf<() => Child>();
  });
});
