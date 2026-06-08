import { describe, it, expect } from "vitest";

import type { HttpResponse } from "../types/response";

import { ParseError } from "./parse-error";

describe("ParseError", () => {
  it("should have correct code", () => {
    const error = new ParseError("parse failed");
    expect(error.code).toBe("ERR_PARSE");
    expect(error.name).toBe("ParseError");
  });

  it("should store response", () => {
    const response = { status: 200 } as HttpResponse<unknown>;
    const error = new ParseError("parse failed", { response });
    expect(error.response).toBe(response);
  });
});
