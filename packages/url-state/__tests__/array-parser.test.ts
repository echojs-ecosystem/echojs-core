import { describe, expect, it } from "vitest";
import { parseAsArrayOf, parseAsString } from "@echojs/url-state";

describe("parseAsArrayOf", () => {
  it("parse: repeated query keys -> array", () => {
    const tags = parseAsArrayOf(parseAsString);
    expect(tags.parse(["a", "b"])).toEqual(["a", "b"]);
  });

  it("serialize: array -> string[]", () => {
    const tags = parseAsArrayOf(parseAsString);
    expect(tags.serialize(["a", "b"])).toEqual(["a", "b"]);
  });
});

