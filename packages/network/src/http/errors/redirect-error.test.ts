import { describe, it, expect } from "vitest";

import { RedirectError } from "./redirect-error";

describe("RedirectError", () => {
  it("should have correct code", () => {
    const error = new RedirectError("too many", { redirectCount: 5 });
    expect(error.code).toBe("ERR_REDIRECT");
    expect(error.name).toBe("RedirectError");
  });

  it("should store redirectCount", () => {
    const error = new RedirectError("too many", { redirectCount: 10 });
    expect(error.redirectCount).toBe(10);
  });

  it("should store lastLocation", () => {
    const error = new RedirectError("too many", {
      redirectCount: 5,
      lastLocation: "https://example.com",
    });
    expect(error.lastLocation).toBe("https://example.com");
  });

  it("should handle undefined lastLocation", () => {
    const error = new RedirectError("too many", { redirectCount: 5 });
    expect(error.lastLocation).toBeUndefined();
  });
});
