import { describe, it, expect } from "vitest";

import { RequestError } from "./request-error";

describe("RequestError", () => {
  it("should have correct code", () => {
    const error = new RequestError("invalid options");
    expect(error.code).toBe("ERR_REQUEST");
    expect(error.name).toBe("RequestError");
  });
});
