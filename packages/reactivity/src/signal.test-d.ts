import { describe, expectTypeOf, it } from "vitest";

import { signal } from "./signal";

describe("signal types", () => {
  it("value() для object/array типизируется как readonly", () => {
    const $user = signal({ name: "Vova", tags: ["a"] });
    const user = $user.value();

    expectTypeOf(user).toEqualTypeOf<{ readonly name: string; readonly tags: readonly string[] }>();
  });

  it("set принимает исходный тип значения", () => {
    const $count = signal(0);
    expectTypeOf($count.set).parameter(0).toEqualTypeOf<number>();
  });
});
