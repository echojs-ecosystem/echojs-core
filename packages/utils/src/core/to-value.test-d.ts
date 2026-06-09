import { expectTypeOf, test } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import type { MaybeSignalOrGetter } from "./types";
import { toValue } from "./to-value";

test("toValue resolves MaybeSignalOrGetter", () => {
  const source: MaybeSignalOrGetter<{ id: number }> = { id: 1 };
  expectTypeOf(toValue(source)).toEqualTypeOf<{ id: number }>();

  const getter: MaybeSignalOrGetter<string> = () => "ok";
  expectTypeOf(toValue(getter)).toEqualTypeOf<string>();

  const $value = signal(false);
  const fromSignal: MaybeSignalOrGetter<boolean> = $value;
  expectTypeOf(toValue(fromSignal)).toEqualTypeOf<boolean>();
});
