import { describe, expectTypeOf, it } from "vitest";

import { computed } from "./computed";
import type { ReadonlySignal } from "./types";

describe("computed types", () => {
  it("возвращает ReadonlySignal", () => {
    const $double = computed(() => 2);
    expectTypeOf($double).toEqualTypeOf<ReadonlySignal<number>>();
  });
});
