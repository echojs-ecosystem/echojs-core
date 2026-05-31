import { describe, expectTypeOf, it } from "vitest";

import { isReadonlySignal, isSignal } from "./public-guards";
import { signal } from "./signal";

describe("public guards types", () => {
  it("isSignal сужает до Signal | ReadonlySignal", () => {
    const value: unknown = signal(1);
    if (isSignal(value)) {
      expectTypeOf(value.value).toBeFunction();
    }
  });

  it("isReadonlySignal сужает до ReadonlySignal", () => {
    const value: unknown = signal(1).readonly();
    if (isReadonlySignal(value)) {
      expectTypeOf(value.value).toBeFunction();
    }
  });
});
