import { describe, it, expect } from "vitest";

import { AbortError } from "./abort-error";

describe("AbortError", () => {
  it("should have correct code", () => {
    const error = new AbortError("aborted");
    expect(error.code).toBe("ERR_ABORT");
    expect(error.name).toBe("AbortError");
  });

  it("should have default message", () => {
    const error = new AbortError();
    expect(error.message).toBe("Request aborted");
  });

  it("should accept custom message", () => {
    const error = new AbortError("User cancelled");
    expect(error.message).toBe("User cancelled");
  });
});
