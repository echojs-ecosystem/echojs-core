import { describe, expect, it } from "vitest";
import { shallowEqual } from "./shallow-equal";

describe("shallowEqual", () => {
  it("returns true for same reference", () => {
    const value = { a: 1 };
    expect(shallowEqual(value, value)).toBe(true);
  });

  it("returns true for shallow-equal objects", () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it("returns false for different keys or values", () => {
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(shallowEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it("returns false for non-objects", () => {
    expect(shallowEqual(1, 1)).toBe(true);
    expect(shallowEqual(1, 2)).toBe(false);
    expect(shallowEqual(null, {})).toBe(false);
  });
});
