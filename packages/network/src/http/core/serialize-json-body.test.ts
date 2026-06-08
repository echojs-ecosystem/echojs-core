import { describe, it, expect } from "vitest";

import { serializeJsonBody } from "./serialize-json-body";

describe("serializeJsonBody", () => {
  it("should serialize object to JSON string", () => {
    const result = serializeJsonBody({ key: "value" });
    expect(result.data).toBe('{"key":"value"}');
    expect(result.contentType).toBe("application/json; charset=utf-8");
  });

  it("should serialize array to JSON string", () => {
    const result = serializeJsonBody([1, 2, 3]);
    expect(result.data).toBe("[1,2,3]");
    expect(result.contentType).toBe("application/json; charset=utf-8");
  });

  it("should serialize string to JSON string", () => {
    const result = serializeJsonBody("hello");
    expect(result.data).toBe('"hello"');
    expect(result.contentType).toBe("application/json; charset=utf-8");
  });

  it("should serialize number to JSON string", () => {
    const result = serializeJsonBody(42);
    expect(result.data).toBe("42");
    expect(result.contentType).toBe("application/json; charset=utf-8");
  });

  it("should serialize boolean to JSON string", () => {
    const result = serializeJsonBody(true);
    expect(result.data).toBe("true");
    expect(result.contentType).toBe("application/json; charset=utf-8");
  });

  it("should serialize null to JSON string", () => {
    const result = serializeJsonBody(null);
    expect(result.data).toBe("null");
    expect(result.contentType).toBe("application/json; charset=utf-8");
  });

  it("should serialize nested objects", () => {
    const result = serializeJsonBody({ nested: { deep: { value: 1 } } });
    expect(result.data).toBe('{"nested":{"deep":{"value":1}}}');
  });

  it("should handle empty object", () => {
    const result = serializeJsonBody({});
    expect(result.data).toBe("{}");
  });

  it("should handle empty array", () => {
    const result = serializeJsonBody([]);
    expect(result.data).toBe("[]");
  });

  it("should handle undefined (serializes to null)", () => {
    const result = serializeJsonBody(undefined);
    expect(result.data).toBe(undefined);
  });
});
