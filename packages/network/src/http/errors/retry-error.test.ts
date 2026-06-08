import { describe, it, expect } from "vitest";

import { RetryError } from "./retry-error";

describe("RetryError", () => {
  it("should have correct code", () => {
    const error = new RetryError("exhausted", { lastError: new Error() });
    expect(error.code).toBe("ERR_RETRY");
    expect(error.name).toBe("RetryError");
  });

  it("should store lastError", () => {
    const lastError = new Error("last attempt");
    const error = new RetryError("exhausted", { lastError });
    expect(error.lastError).toBe(lastError);
  });

  it("should use lastError as cause by default", () => {
    const lastError = new Error("last attempt");
    const error = new RetryError("exhausted", { lastError });
    expect(error.cause).toBe(lastError);
  });

  it("should prefer explicit cause over lastError", () => {
    const lastError = new Error("last attempt");
    const explicitCause = new Error("explicit");
    const error = new RetryError("exhausted", { lastError, cause: explicitCause });
    expect(error.cause).toBe(explicitCause);
  });
});
