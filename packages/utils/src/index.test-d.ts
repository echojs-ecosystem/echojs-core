import { expectTypeOf, test } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import {
  clipboard as createClipboard,
  counter as createCounter,
  debounce as createDebounce,
  isEmptyArray,
  isString,
  permission as createPermission,
  previous as createPrevious,
  toValue,
  toggle as createToggle,
  windowSize as createWindowSize,
} from "./index";

test("utility return types", () => {
  const size = createWindowSize();
  expectTypeOf(size.width).toBeFunction();
  expectTypeOf(size.dispose).toBeFunction();
  expectTypeOf(size.$width).toBeObject();

  const clip = createClipboard();
  expectTypeOf(clip.copy).toBeFunction();
  expectTypeOf(clip.text).toBeFunction();

  const count = createCounter(0);
  expectTypeOf(count.value).toBeFunction();
  expectTypeOf(count.inc).toBeFunction();
  expectTypeOf(count.set).toBeFunction();

  const toggled = createToggle(false);
  expectTypeOf(toggled.value).toBeFunction();
  expectTypeOf(toggled.toggle).toBeFunction();
  expectTypeOf(toggled.on).toBeFunction();
  expectTypeOf(toggled.off).toBeFunction();

  const $source = signal(1);
  const debounced = createDebounce($source, 100);
  expectTypeOf(debounced.value).toBeFunction();
  expectTypeOf(debounced.$value).toBeObject();

  const prev = createPrevious($source);
  expectTypeOf(prev.value()).toEqualTypeOf<number | undefined>();

  const perm = createPermission("geolocation");
  expectTypeOf(perm.state()).toEqualTypeOf<PermissionState | "unsupported">();
  expectTypeOf(perm.supported()).toEqualTypeOf<boolean>();

  const items: unknown = [];
  if (isEmptyArray(items)) {
    expectTypeOf(items).toEqualTypeOf<never[]>();
  }
  const name: unknown = "x";
  if (isString(name)) {
    expectTypeOf(name).toEqualTypeOf<string>();
  }
});

test("toValue types", () => {
  expectTypeOf(toValue(42)).toEqualTypeOf<number>();
  expectTypeOf(toValue(() => "x")).toEqualTypeOf<string>();
  expectTypeOf(toValue(signal(true))).toEqualTypeOf<boolean>();
});
