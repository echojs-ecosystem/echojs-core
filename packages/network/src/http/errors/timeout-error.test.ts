import { describe, it, expect } from "vitest";

import { TimeoutError } from "./timeout-error";

describe("TimeoutError", () => {
  it("should have correct code", () => {
    const error = new TimeoutError("timeout", { phase: "request" });
    expect(error.code).toBe("ERR_TIMEOUT");
    expect(error.name).toBe("TimeoutError");
  });

  it("should store phase", () => {
    const error = new TimeoutError("timeout", { phase: "request" });
    expect(error.phase).toBe("request");
  });

  it("should support all phases", () => {
    expect(new TimeoutError("", { phase: "request" }).phase).toBe("request");
    expect(new TimeoutError("", { phase: "response" }).phase).toBe("response");
    expect(new TimeoutError("", { phase: "read" }).phase).toBe("read");
  });
});
