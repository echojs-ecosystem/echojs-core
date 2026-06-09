import { describe, expect, it } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { toValue } from "./to-value";

describe("toValue", () => {
  it("returns plain values as-is", () => {
    expect(toValue(42)).toBe(42);
    expect(toValue("hello")).toBe("hello");
    expect(toValue(null)).toBeNull();
  });

  it("invokes getters", () => {
    let count = 0;
    expect(toValue(() => ++count)).toBe(1);
    expect(toValue(() => count)).toBe(1);
  });

  it("unwraps readonly signals", () => {
    const $value = signal("initial");
    expect(toValue($value)).toBe("initial");
    $value.set("updated");
    expect(toValue($value)).toBe("updated");
  });
});
