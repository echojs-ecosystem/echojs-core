import { describe, expect, it } from "vitest";
import { parseAsFloat } from "@echojs/url-state";

describe("parseAsFloat", () => {
  it("parse: valid float -> number", () => {
    expect(parseAsFloat.parse("10.5")).toBe(10.5);
    expect(parseAsFloat.parse("42")).toBe(42);
  });

  it("parse: invalid -> null", () => {
    expect(parseAsFloat.parse("abc")).toBeNull();
    expect(parseAsFloat.parse("")).toBeNull();
  });

  it("serialize: number -> string", () => {
    expect(parseAsFloat.serialize(10.5)).toBe("10.5");
  });
});

