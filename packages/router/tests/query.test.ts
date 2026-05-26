import { describe, expect, it } from "vitest";
import { parseQuery, stringifyQuery } from "../src/core/query.js";

describe("query", () => {
  it("parseQuery reads search string", () => {
    expect(parseQuery("?tab=profile&page=2")).toEqual({ tab: "profile", page: "2" });
  });

  it("stringifyQuery serializes primitives", () => {
    expect(stringifyQuery({ tab: "profile", page: 2, enabled: true })).toBe(
      "?tab=profile&page=2&enabled=true",
    );
  });

  it("stringifyQuery skips null and undefined", () => {
    expect(stringifyQuery({ a: "1", b: null, c: undefined })).toBe("?a=1");
  });

  it("stringifyQuery supports repeated keys for arrays", () => {
    expect(stringifyQuery({ tag: ["a", "b"] })).toBe("?tag=a&tag=b");
  });
});
