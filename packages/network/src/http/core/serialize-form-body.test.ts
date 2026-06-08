import { describe, it, expect } from "vitest";

import { serializeFormBody } from "./serialize-form-body";

describe("serializeFormBody", () => {
  it("should serialize record to URLSearchParams", () => {
    const result = serializeFormBody({ key1: "value1", key2: "value2" });
    expect(result.data).toBeInstanceOf(URLSearchParams);
    expect(result.data.get("key1")).toBe("value1");
    expect(result.data.get("key2")).toBe("value2");
    expect(result.contentType).toBe("application/x-www-form-urlencoded");
  });

  it("should convert numbers to strings", () => {
    const result = serializeFormBody({ count: 42, price: 19.99 });
    expect(result.data.get("count")).toBe("42");
    expect(result.data.get("price")).toBe("19.99");
  });

  it("should convert booleans to strings", () => {
    const result = serializeFormBody({ active: true, deleted: false });
    expect(result.data.get("active")).toBe("true");
    expect(result.data.get("deleted")).toBe("false");
  });

  it("should serialize complex values as JSON", () => {
    const result = serializeFormBody({ object: { key: "value" }, array: [1, 2, 3] });
    expect(result.data.get("object")).toBe('{"key":"value"}');
    expect(result.data.get("array")).toBe("[1,2,3]");
  });

  it("should skip undefined values", () => {
    const result = serializeFormBody({ valid: "value", skipped: undefined });
    expect(result.data.get("valid")).toBe("value");
    expect(result.data.has("skipped")).toBe(false);
  });

  it("should skip null values", () => {
    const result = serializeFormBody({ valid: "value", skipped: null });
    expect(result.data.get("valid")).toBe("value");
    expect(result.data.has("skipped")).toBe(false);
  });

  it("should clone URLSearchParams input", () => {
    const input = new URLSearchParams({ key: "value" });
    const result = serializeFormBody(input);
    expect(result.data).not.toBe(input);
    expect(result.data.get("key")).toBe("value");
  });

  it("should handle empty record", () => {
    const result = serializeFormBody({});
    expect(result.data).toBeInstanceOf(URLSearchParams);
    expect(result.data.toString()).toBe("");
  });

  it("should handle URLSearchParams with multiple values", () => {
    const input = new URLSearchParams();
    input.append("key", "value1");
    input.append("key", "value2");
    const result = serializeFormBody(input);
    expect(result.data.getAll("key")).toEqual(["value1", "value2"]);
  });
});
