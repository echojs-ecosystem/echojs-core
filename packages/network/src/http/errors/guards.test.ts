import { describe, it, expect } from "vitest";
import {
  isHttpError,
  isTimeoutError,
  isAbortError,
  isNetworkError,
  isStatusError,
} from "./guards";
import { HttpClientError } from "./http-client-error";
import { TimeoutError } from "./timeout-error";
import { AbortError } from "./abort-error";
import { NetworkError } from "./network-error";
import { HTTPStatusError } from "./http-status-error";
import { RequestError } from "./request-error";
import { ParseError } from "./parse-error";
import { RetryError } from "./retry-error";
import { RedirectError } from "./redirect-error";

describe("isHttpError", () => {
  it("should return true for HttpClientError instances", () => {
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT" });
    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for TimeoutError instances", () => {
    const error = new TimeoutError("timeout", { phase: "request" });
    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for AbortError instances", () => {
    const error = new AbortError("aborted");
    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for NetworkError instances", () => {
    const error = new NetworkError("network failed");
    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for HTTPStatusError instances", () => {
    const error = new HTTPStatusError("status error", { response: {} as any });
    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for RequestError instances", () => {
    const error = new RequestError("request error");
    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for ParseError instances", () => {
    const error = new ParseError("parse error");
    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for RetryError instances", () => {
    const error = new RetryError("retry error", { lastError: new Error() });
    expect(isHttpError(error)).toBe(true);
  });

  it("should return true for RedirectError instances", () => {
    const error = new RedirectError("redirect error", { redirectCount: 1 });
    expect(isHttpError(error)).toBe(true);
  });

  it("should return false for plain Error", () => {
    expect(isHttpError(new Error("plain"))).toBe(false);
  });

  it("should return false for TypeError", () => {
    expect(isHttpError(new TypeError("type"))).toBe(false);
  });

  it("should return false for null", () => {
    expect(isHttpError(null)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isHttpError(undefined)).toBe(false);
  });

  it("should return false for plain object", () => {
    expect(isHttpError({ code: "ERR_HTTP_CLIENT" })).toBe(false);
  });
});

describe("isTimeoutError", () => {
  it("should return true for TimeoutError", () => {
    const error = new TimeoutError("timeout", { phase: "request" });
    expect(isTimeoutError(error)).toBe(true);
  });

  it("should return false for other HttpClientError types", () => {
    expect(isTimeoutError(new AbortError("aborted"))).toBe(false);
    expect(isTimeoutError(new NetworkError("failed"))).toBe(false);
  });

  it("should return false for plain Error", () => {
    expect(isTimeoutError(new Error("plain"))).toBe(false);
  });

  it("should return false for null", () => {
    expect(isTimeoutError(null)).toBe(false);
  });
});

describe("isAbortError", () => {
  it("should return true for AbortError", () => {
    const error = new AbortError("aborted");
    expect(isAbortError(error)).toBe(true);
  });

  it("should return false for other HttpClientError types", () => {
    expect(isAbortError(new TimeoutError("timeout", { phase: "request" }))).toBe(false);
    expect(isAbortError(new NetworkError("failed"))).toBe(false);
  });

  it("should return false for plain Error", () => {
    expect(isAbortError(new Error("plain"))).toBe(false);
  });

  it("should return false for DOMException with AbortError name", () => {
    // DOMException is not AbortError in our type hierarchy
    const domException = new DOMException("Aborted", "AbortError");
    expect(isAbortError(domException)).toBe(false);
  });
});

describe("isNetworkError", () => {
  it("should return true for NetworkError", () => {
    const error = new NetworkError("network failed");
    expect(isNetworkError(error)).toBe(true);
  });

  it("should return false for other HttpClientError types", () => {
    expect(isNetworkError(new TimeoutError("timeout", { phase: "request" }))).toBe(false);
    expect(isNetworkError(new AbortError("aborted"))).toBe(false);
  });

  it("should return false for plain Error", () => {
    expect(isNetworkError(new Error("plain"))).toBe(false);
  });

  it("should return false for null", () => {
    expect(isNetworkError(null)).toBe(false);
  });
});

describe("isStatusError", () => {
  it("should return true for HTTPStatusError", () => {
    const error = new HTTPStatusError("status error", { response: {} as any });
    expect(isStatusError(error)).toBe(true);
  });

  it("should return false for other HttpClientError types", () => {
    expect(isStatusError(new TimeoutError("timeout", { phase: "request" }))).toBe(false);
    expect(isStatusError(new NetworkError("failed"))).toBe(false);
  });

  it("should return false for plain Error", () => {
    expect(isStatusError(new Error("plain"))).toBe(false);
  });

  it("should return false for null", () => {
    expect(isStatusError(null)).toBe(false);
  });
});

describe("error model", () => {
  it("supports instanceof checks", () => {
    expect(new RequestError("x") instanceof HttpClientError).toBe(true);
    expect(new NetworkError("x") instanceof HttpClientError).toBe(true);
    expect(new TimeoutError("x", { phase: "read" }) instanceof HttpClientError).toBe(true);
    expect(new AbortError() instanceof HttpClientError).toBe(true);
    expect(new ParseError("x") instanceof HttpClientError).toBe(true);
    expect(new RetryError("x", { lastError: new Error("y") }) instanceof HttpClientError).toBe(
      true,
    );
    expect(new RedirectError("x", { redirectCount: 3 }) instanceof HttpClientError).toBe(true);
  });

  it("provides type guards", () => {
    const e: unknown = new TimeoutError("x", { phase: "read" });
    expect(isHttpError(e)).toBe(true);
    expect(isTimeoutError(e)).toBe(true);
    expect(isAbortError(e)).toBe(false);
    expect(isNetworkError(e)).toBe(false);
    expect(isStatusError(e)).toBe(false);
  });
});
