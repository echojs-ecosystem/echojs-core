import { describe, expect, it } from "vitest";

import { isFunction, isObjectLike, isPlainObject } from "./utils";

describe("utils", () => {
  it("isObjectLike", () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike([])).toBe(true);
    expect(isObjectLike(null)).toBe(false);
    expect(isObjectLike("x")).toBe(false);
  });

  it("isPlainObject", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
  });

  it("isFunction", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(null)).toBe(false);
  });
});
