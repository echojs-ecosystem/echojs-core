import { describe, expectTypeOf, it } from "vitest";

import type { TranslationKey } from "./nested-keys";

type AppMessages = {
  common: {
    save: string;
    nested: {
      deep: string;
    };
  };
  items: {
    one: string;
    few: string;
    other: string;
  };
  flat: string;
};

describe("TranslationKey", () => {
  it("builds dot paths for nested strings and plural buckets", () => {
    type Keys = TranslationKey<AppMessages>;

    expectTypeOf<Keys>().toEqualTypeOf<
      | "common.save"
      | "common.nested.deep"
      | "items"
      | "flat"
    >();
  });
});
