import { describe, it, expect } from "vitest";

import type { HttpResponse } from "../types/response";

import { HTTPStatusError } from "./http-status-error";

describe("HTTPStatusError", () => {
  it("should have correct code", () => {
    const response = { status: 500 } as HttpResponse<unknown>;
    const error = new HTTPStatusError("error", { response });
    expect(error.code).toBe("ERR_HTTP_STATUS");
    expect(error.name).toBe("HTTPStatusError");
  });

  it("should store response", () => {
    const response = { status: 404, body: "Not found" } as HttpResponse<unknown>;
    const error = new HTTPStatusError("error", { response });
    expect(error.response).toBe(response);
  });
});
