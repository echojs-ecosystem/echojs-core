import { describe, it, expect } from "vitest";

import { parseTextBody } from "./parse-text-body";

describe("parseTextBody", () => {
  it("should decode bytes to UTF-8 text by default", () => {
    const bytes = new TextEncoder().encode("Hello World");
    const result = parseTextBody(bytes, undefined, {});
    expect(result).toBe("Hello World");
  });

  it("should decode empty bytes to empty string", () => {
    const bytes = new Uint8Array(0);
    const result = parseTextBody(bytes, undefined, {});
    expect(result).toBe("");
  });

  it("should decode with specified encoding", () => {
    const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
    const result = parseTextBody(bytes, "utf-8", {});
    expect(result).toBe("Hello");
  });

  it("should handle unicode characters", () => {
    const bytes = new TextEncoder().encode("Hello 世界 🌍");
    const result = parseTextBody(bytes, undefined, {});
    expect(result).toBe("Hello 世界 🌍");
  });

  it("should handle invalid UTF-8 with replacement characters", () => {
    const bytes = new Uint8Array([0xff, 0xfe]);
    const result = parseTextBody(bytes, "utf-8", {});
    expect(result).toContain("\uFFFD");
  });

  it("should not throw for invalid UTF-8 sequences", () => {
    const bytes = new Uint8Array([0xff, 0xfe]);
    expect(() => parseTextBody(bytes, "utf-8", {})).not.toThrow();
  });

  it("should decode multibyte characters correctly", () => {
    const text = "日本語テキスト";
    const bytes = new TextEncoder().encode(text);
    const result = parseTextBody(bytes, undefined, {});
    expect(result).toBe(text);
  });

  it("should handle binary data by replacing invalid sequences", () => {
    const bytes = new Uint8Array([0x00, 0x01, 0x02, 0x03]);
    const result = parseTextBody(bytes, undefined, {});
    expect(typeof result).toBe("string");
  });
});
