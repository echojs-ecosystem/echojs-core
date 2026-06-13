import { describe, expect, it } from "vitest";

import { defaultEquals, queryParamsEquals, shallowEqual } from "./equality";

describe("defaultEquals", () => {
  it("uses Object.is", () => {
    expect(defaultEquals(1, 1)).toBe(true);
    expect(defaultEquals({}, {})).toBe(false);
  });
});

describe("shallowEqual", () => {
  it("compares plain objects by reference per field", () => {
    const tags = ["a", "b"];
    expect(shallowEqual({ q: "x", tag: tags }, { q: "x", tag: tags })).toBe(true);
    expect(shallowEqual({ q: "x" }, { q: "y" })).toBe(false);
    expect(shallowEqual({ q: "x" }, { q: "x", page: 1 })).toBe(false);
  });
});

describe("queryParamsEquals", () => {
  it("is shallowEqual", () => {
    expect(queryParamsEquals).toBe(shallowEqual);
  });
});
