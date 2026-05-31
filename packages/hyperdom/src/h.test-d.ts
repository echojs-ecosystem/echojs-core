import { describe, expectTypeOf, it } from "vitest";

import { h } from "./h";
import type { Child } from "./types";

describe("h types", () => {
  it("infers intrinsic element type for div", () => {
    const el = h("div", { id: "x" }, "text");

    expectTypeOf(el).toEqualTypeOf<Child>();
  });

  it("accepts component tags", () => {
    const Comp = (props: { n: number; children?: unknown }) => h("span", null, String(props.n));
    const node = h(Comp, { n: 1 });

    expectTypeOf(node).toEqualTypeOf<Child>();
  });
});
