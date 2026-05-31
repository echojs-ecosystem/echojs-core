import { describe, expectTypeOf, it } from "vitest";

import { createRoute } from "./create-route";

describe("createRoute types", () => {
  it("infers route name and params", () => {
    const user = createRoute<"user", { id: string }, { tab?: string }>("user");

    expectTypeOf(user.name).toEqualTypeOf<"user">();
    expectTypeOf(user.go).parameter(0).toEqualTypeOf<{ id: string }>();
    expectTypeOf(user.open).toBeFunction();
  });
});
