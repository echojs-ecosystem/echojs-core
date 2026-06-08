import { describe, it, expect } from "vitest";

import { parseBytesBody } from "./parse-bytes-body";

describe("parseBytesBody", () => {
  it("should return Uint8Array as-is", () => {
    const input = new Uint8Array([1, 2, 3, 4, 5]);
    const result = parseBytesBody(input);
    expect(result).toBe(input);
  });

  it("should convert ArrayBuffer to Uint8Array", () => {
    const buffer = new ArrayBuffer(5);
    const view = new Uint8Array(buffer);
    view.set([1, 2, 3, 4, 5]);
    const result = parseBytesBody(buffer);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });

  it("should handle empty ArrayBuffer", () => {
    const buffer = new ArrayBuffer(0);
    const result = parseBytesBody(buffer);
    expect(result).toEqual(new Uint8Array(0));
  });

  it("should handle empty Uint8Array", () => {
    const input = new Uint8Array(0);
    const result = parseBytesBody(input);
    expect(result).toBe(input);
  });

  it("should create new view for ArrayBuffer (not copy data)", () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view.set([1, 2, 3, 4]);
    const result = parseBytesBody(buffer);
    result[0] = 99;
    expect(view[0]).toBe(99);
  });
});
