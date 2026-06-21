import { describe, expectTypeOf, it } from "vitest";

import { isMatching, P } from "./patterns";

describe("patterns types", () => {
  it("isMatching accepts type patterns", () => {
    expectTypeOf(isMatching(P.string, "label")).toEqualTypeOf<boolean>();
    expectTypeOf(isMatching(P.number, 1)).toEqualTypeOf<boolean>();
    expectTypeOf(isMatching(P.boolean, true)).toEqualTypeOf<boolean>();
  });
});
