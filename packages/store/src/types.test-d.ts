import { describe, expectTypeOf, it } from "vitest";

import type { ExtensionResult, ReadonlyStore, SourceValues, Store, StoreExtension } from "./types";

describe("SourceValues", () => {
  it("unwraps store state types from a sources record", () => {
    type Sources = {
      count: Store<number>;
      label: ReadonlyStore<string>;
    };

    expectTypeOf<SourceValues<Sources>>().toEqualTypeOf<{
      count: number;
      label: string;
    }>();
  });
});

describe("ExtensionResult", () => {
  it("extracts extension return type", () => {
    type Ext = StoreExtension<number, { increment(): void; step: number }>;

    expectTypeOf<ExtensionResult<Ext>>().toEqualTypeOf<{
      increment(): void;
      step: number;
    }>();
  });
});
