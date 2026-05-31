import { describe, expectTypeOf, it } from "vitest";

import { combine } from "./combine";
import { createStore } from "./create-store";

describe("combine types", () => {
  it("infers combiner argument and result types", () => {
    const firstName = createStore("Vova");
    const lastName = createStore("Ivanov");

    const fullName = combine({ firstName, lastName }, ({ firstName, lastName }) => {
      expectTypeOf(firstName).toEqualTypeOf<string>();
      expectTypeOf(lastName).toEqualTypeOf<string>();
      return `${firstName} ${lastName}`;
    });

    expectTypeOf(fullName.value()).toEqualTypeOf<string>();
  });
});
