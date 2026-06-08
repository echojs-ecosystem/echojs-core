import { describe, it, expect } from "vitest";

import { NetworkError } from "./network-error";

describe("NetworkError", () => {
  it("should have correct code", () => {
    const error = new NetworkError("network failed");
    expect(error.code).toBe("ERR_NETWORK");
    expect(error.name).toBe("NetworkError");
  });
});
