import { describe, expect, it } from "vitest";

import { computed } from "./computed";
import { isReadonlySignal, isSignal } from "./public-guards";
import { signal } from "./signal";

describe("isSignal()", () => {
  it("false на произвольных значениях", () => {
    expect(isSignal(null)).toBe(false);
    expect(isSignal(undefined)).toBe(false);
    expect(isSignal({})).toBe(false);
    expect(isSignal(() => {})).toBe(false);
  });

  it("true на сигналах этого пакета", () => {
    const $a = signal(1);
    const $b = $a.readonly();
    const $c = computed(() => $a.value() * 2);

    expect(isSignal($a)).toBe(true);
    expect(isSignal($b)).toBe(true);
    expect(isSignal($c)).toBe(true);
  });
});

describe("isReadonlySignal()", () => {
  it("false на произвольных значениях", () => {
    expect(isReadonlySignal(null)).toBe(false);
  });

  it("true только на readonly сигналах", () => {
    const $a = signal(1);
    const $b = $a.readonly();
    const $c = computed(() => $a.value() * 2);

    expect(isReadonlySignal($a)).toBe(false);
    expect(isReadonlySignal($b)).toBe(true);
    expect(isReadonlySignal($c)).toBe(true);
  });
});
