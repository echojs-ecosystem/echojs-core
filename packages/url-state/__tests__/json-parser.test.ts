import { describe, expect, it } from "vitest";
import { parseAsJson, type StandardSchemaLike } from "@echojs/url-state";

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

  it("validates with Standard Schema", () => {
    type Pkg = { pkg: string; version: number };
    const schema: StandardSchemaLike<Pkg> = {
      "~standard": {
        version: 1,
        vendor: "test",
        validate(value) {
          if (
            typeof value === "object" &&
            value !== null &&
            "pkg" in value &&
            typeof (value as Pkg).pkg === "string" &&
            "version" in value &&
            typeof (value as Pkg).version === "number"
          ) {
            return { value: value as Pkg };
          }
          return { issues: [{ message: "invalid" }] };
        },
      },
    };
    const p = parseAsJson<Pkg>(schema);

    expect(p.parse('{"pkg":"echojs","version":2}')).toEqual({ pkg: "echojs", version: 2 });
    expect(p.parse('{"pkg":"x"}')).toBeNull();
  });

  it("validates with custom function", () => {
    const p = parseAsJson<number>((value) => (typeof value === "number" ? value : null));
    expect(p.parse("42")).toBe(42);
    expect(p.parse('"nope"')).toBeNull();
  });
});

