import { describe, expectTypeOf, it } from "vitest";

import { createStore } from "./create-store";
import { readonly } from "./readonly";
import type { ReadonlyStore, Store } from "./types";

describe("readonly types", () => {
  it("returns ReadonlyStore without mutating methods", () => {
    const counter = createStore(0);
    const readonlyCounter = readonly(counter);

    expectTypeOf(readonlyCounter).toEqualTypeOf<ReadonlyStore<number>>();
    expectTypeOf(readonlyCounter).not.toMatchObjectType<Store<number>>();
  });
});
