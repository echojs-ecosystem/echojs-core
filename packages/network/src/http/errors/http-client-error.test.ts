import { describe, it, expect } from "vitest";

import type { NormalizedRequestOptions } from "../types/internal";
import type { HttpResponse } from "../types/response";
import type { HttpTimings } from "../types/timings";

import { HttpClientError } from "./http-client-error";

describe("HttpClientError", () => {
  it("should create error with message", () => {
    const error = new HttpClientError("test message", { code: "ERR_HTTP_CLIENT" });
    expect(error.message).toBe("test message");
    expect(error.name).toBe("HttpClientError");
  });

  it("should have correct code", () => {
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT" });
    expect(error.code).toBe("ERR_HTTP_CLIENT");
  });

  it("should store cause", () => {
    const cause = new Error("original");
    const error = new HttpClientError("wrapped", { code: "ERR_HTTP_CLIENT", cause });
    expect(error.cause).toBe(cause);
  });

  it("should store request", () => {
    const request = { url: "https://example.com" } as NormalizedRequestOptions;
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", request });
    expect(error.request).toBe(request);
  });

  it("should store response", () => {
    const response = { status: 500 } as HttpResponse<unknown>;
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", response });
    expect(error.response).toBe(response);
  });

  it("should store timings", () => {
    const timings: HttpTimings = { request: 100, response: 200 };
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", timings });
    expect(error.timings).toBe(timings);
  });

  it("should default retryCount to 0", () => {
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT" });
    expect(error.retryCount).toBe(0);
  });

  it("should store custom retryCount", () => {
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", retryCount: 3 });
    expect(error.retryCount).toBe(3);
  });

  it("should freeze context", () => {
    const error = new HttpClientError("test", {
      code: "ERR_HTTP_CLIENT",
      context: { key: "value" },
    });
    expect(Object.isFrozen(error.context)).toBe(true);
  });

  it("should store requestId", () => {
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", requestId: "abc-123" });
    expect(error.requestId).toBe("abc-123");
  });

  it("should derive method from request", () => {
    const request = { method: "POST" } as NormalizedRequestOptions;
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", request });
    expect(error.method).toBe("POST");
  });

  it("should use provided method over request method", () => {
    const request = { method: "POST" } as NormalizedRequestOptions;
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", request, method: "GET" });
    expect(error.method).toBe("GET");
  });

  it("should derive url from request", () => {
    const request = { url: "https://example.com" } as NormalizedRequestOptions;
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", request });
    expect(error.url).toBe("https://example.com");
  });

  it("should derive status from response", () => {
    const response = { status: 404 } as HttpResponse<unknown>;
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", response });
    expect(error.status).toBe(404);
  });

  it("should freeze headers", () => {
    const headers = { "x-custom": "value" };
    const error = new HttpClientError("test", { code: "ERR_HTTP_CLIENT", headers });
    expect(Object.isFrozen(error.headers)).toBe(true);
  });

  it("should store responseBodyPreview", () => {
    const error = new HttpClientError("test", {
      code: "ERR_HTTP_CLIENT",
      responseBodyPreview: '{"error":"message"}',
    });
    expect(error.responseBodyPreview).toBe('{"error":"message"}');
  });
});
