import { describe, it, expect } from "vitest";

import { ParseError } from "../errors/parse-error";

import { parseJsonBody } from "./parse-json-body";

describe("parseJsonBody", () => {
  it("should parse valid JSON object", async () => {
    const result = await parseJsonBody('{"key":"value"}', {});
    expect(result).toEqual({ key: "value" });
  });

  it("should parse valid JSON array", async () => {
    const result = await parseJsonBody("[1,2,3]", {});
    expect(result).toEqual([1, 2, 3]);
  });

  it("should parse valid JSON string", async () => {
    const result = await parseJsonBody('"hello"', {});
    expect(result).toBe("hello");
  });

  it("should parse valid JSON number", async () => {
    const result = await parseJsonBody("42", {});
    expect(result).toBe(42);
  });

  it("should parse valid JSON boolean", async () => {
    const result = await parseJsonBody("true", {});
    expect(result).toBe(true);
  });

  it("should parse valid JSON null", async () => {
    const result = await parseJsonBody("null", {});
    expect(result).toBe(null);
  });

  it("should parse empty JSON object", async () => {
    const result = await parseJsonBody("{}", {});
    expect(result).toEqual({});
  });

  it("should parse empty JSON array", async () => {
    const result = await parseJsonBody("[]", {});
    expect(result).toEqual([]);
  });

  it("should throw ParseError for invalid JSON", async () => {
    await expect(parseJsonBody("not json", {})).rejects.toThrow(ParseError);
  });

  it("should throw ParseError with correct message for invalid JSON", async () => {
    await expect(parseJsonBody("{invalid}", {})).rejects.toThrow("Invalid JSON body");
  });

  it("should include cause in ParseError", async () => {
    try {
      await parseJsonBody("invalid", {});
    } catch (error) {
      expect(error).toBeInstanceOf(ParseError);
      expect((error as ParseError).cause).toBeInstanceOf(SyntaxError);
    }
  });

  it("should parse nested JSON", async () => {
    const result = await parseJsonBody('{"outer":{"inner":"value"}}', {});
    expect(result).toEqual({ outer: { inner: "value" } });
  });

  it("should parse JSON with unicode characters", async () => {
    const result = await parseJsonBody('{"message":"Hello 世界"}', {});
    expect(result).toEqual({ message: "Hello 世界" });
  });
});
