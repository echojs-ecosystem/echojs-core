import { describe, expectTypeOf, it } from "vitest";

import { createView } from "./create-view";
import { h } from "./h";
import type { Child } from "./types";

describe("createView types", () => {
  it("infers view model type", () => {
    const View = createView((vm: { n: number }) => h("div", null, String(vm.n)), "CounterView");

    expectTypeOf(View).parameter(0).toEqualTypeOf<{ n: number }>();
    expectTypeOf(View).returns.toEqualTypeOf<Child>();
  });

  it("supports void view model", () => {
    const View = createView((_vm: void) => h("div", null, "ok"), "EmptyView");

    expectTypeOf(View(undefined as void)).returns.toEqualTypeOf<Child>();
  });
});
