import { describe, expectTypeOf, it } from "vitest";

import type { DeepReadonly, ReadValue, ReadonlySignal, Signal } from "./types";

describe("DeepReadonly", () => {
  it("делает вложенные поля readonly", () => {
    type User = { name: string; tags: string[] };
    expectTypeOf<DeepReadonly<User>>().toEqualTypeOf<{
      readonly name: string;
      readonly tags: readonly string[];
    }>();
  });
});

describe("ReadValue", () => {
  it("примитивы остаются без изменений", () => {
    expectTypeOf<ReadValue<number>>().toEqualTypeOf<number>();
  });

  it("объекты становятся deep readonly", () => {
    type User = { id: number };
    expectTypeOf<ReadValue<User>>().toEqualTypeOf<{ readonly id: number }>();
  });
});

describe("Signal / ReadonlySignal", () => {
  it("Signal расширяет ReadonlySignal mutating API", () => {
    type Writable = Pick<Signal<number>, "set" | "update" | "readonly">;
    expectTypeOf<Writable>().toMatchObjectType<{
      set(next: number): void;
      update(fn: (prev: number) => number): void;
      readonly(): ReadonlySignal<number>;
    }>();
  });
});
