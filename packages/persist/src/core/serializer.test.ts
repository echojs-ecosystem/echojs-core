import { describe, expect, it } from "vitest";

import { jsonSerializer } from "./serializer";

describe("jsonSerializer", () => {
  it("serializes and deserializes JSON", () => {
    const value = { a: 1, b: ["x"] };
    const serialized = jsonSerializer.serialize(value);
    expect(jsonSerializer.deserialize(serialized)).toEqual(value);
  });

  it("throws on invalid JSON", () => {
    expect(() => jsonSerializer.deserialize("{invalid")).toThrow(/invalid JSON/i);
  });
});
