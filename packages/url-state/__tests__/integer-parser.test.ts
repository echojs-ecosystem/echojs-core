import { describe, expect, it } from "vitest";
import { parseAsInteger } from "@echojs/url-state";

describe("parseAsInteger", () => {
  it("parse: valid integer -> number", () => {
    expect(parseAsInteger.parse("42")).toBe(42);
    expect(parseAsInteger.parse("-10")).toBe(-10);
  });

  it("parse: invalid -> null", () => {
    expect(parseAsInteger.parse("abc")).toBeNull();
    expect(parseAsInteger.parse("10.5")).toBeNull();
  });

  it("serialize: number -> string", () => {
    expect(parseAsInteger.serialize(42)).toBe("42");
  });
});

