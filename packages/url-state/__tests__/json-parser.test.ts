import { describe, expect, it } from "vitest";
import { parseAsJson } from "@echojs/url-state";

describe("parseAsJson", () => {
  it("parse: valid json", () => {
    const p = parseAsJson<{ id: number }>();
    expect(p.parse('{"id":1}')).toEqual({ id: 1 });
  });

  it("parse: invalid json -> null", () => {
    const p = parseAsJson();
    expect(p.parse("{")).toBeNull();
  });

  it("serialize", () => {
    const p = parseAsJson<{ id: number }>();
    expect(p.serialize({ id: 1 })).toBe('{"id":1}');
  });
});

