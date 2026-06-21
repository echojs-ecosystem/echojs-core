import { describe, expectTypeOf, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";

import { h } from "../../hyperscript/h";
import type { Child } from "../../core/types";
import { List } from "./list";

describe("List types", () => {
  it("accepts signal and getter sources", () => {
    const items = signal(["a", "b"]);

    expectTypeOf(List(items, (item) => h("div", null, item))).toEqualTypeOf<() => Child>();
    expectTypeOf(List(() => ["a"], (item) => h("div", null, item))).toEqualTypeOf<() => Child>();
  });

  it("infers item type from source", () => {
    const items = signal([1, 2, 3]);

    List(items, (item, index) => {
      expectTypeOf(item).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<() => number>();
      return h("div", null, String(item));
    });
  });
});
