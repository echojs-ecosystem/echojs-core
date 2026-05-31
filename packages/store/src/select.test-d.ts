import { describe, expectTypeOf, it } from "vitest";

import { createStore } from "./create-store";
import { select } from "./select";

describe("select types", () => {
  it("infers selected value type", () => {
    const userStore = createStore({
      id: "1",
      name: "Vova",
      age: 30,
    });

    const userName = select(userStore, (user) => user.name);

    expectTypeOf(userName.value()).toEqualTypeOf<string>();
    expectTypeOf(userName.kind).toEqualTypeOf<"readonly-store">();
  });
});
