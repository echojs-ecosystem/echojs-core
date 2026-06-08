import { bench, describe } from "vitest";
import { mergeRequestOptions, normalizeRequestOptions, mergeAndNormalize } from "../../src/http/options/index";

const baseOptions = {
  method: "GET" as const,
  baseUrl: "https://api.example.com",
  headers: { "X-Base": "base" },
  timeout: { request: 5000 },
  retry: { limit: 3 },
  context: { env: "test" },
};

const overrideOptions = {
  method: "POST" as const,
  url: "/users",
  headers: { "X-Override": "override" },
  json: { name: "test" },
  timeout: { response: 10000 },
  context: { requestId: "123" },
};

describe("mergeRequestOptions", () => {
  bench("simple merge", () => {
    mergeRequestOptions(baseOptions, overrideOptions);
  });

  bench("merge with hooks", () => {
    const parent = {
      ...baseOptions,
      hooks: {
        init: [(options) => options],
        beforeRequest: [(options) => options],
      },
    };
    const child = {
      ...overrideOptions,
      hooks: {
        afterResponse: [(response) => response],
      },
    };
    mergeRequestOptions(parent, child);
  });

  bench("merge with empty options", () => {
    mergeRequestOptions({}, {});
  });
});

describe("normalizeRequestOptions", () => {
  bench("normalize simple GET", () => {
    normalizeRequestOptions({
      method: "GET",
      url: "https://api.example.com/users",
    });
  });

  bench("normalize with JSON body", () => {
    normalizeRequestOptions({
      method: "POST",
      url: "https://api.example.com/users",
      json: { name: "John", email: "john@example.com", age: 30 },
      headers: { "X-Custom": "value" },
    });
  });

  bench("normalize with full options", () => {
    normalizeRequestOptions({
      method: "POST",
      baseUrl: "https://api.example.com",
      url: "/users",
      json: { name: "John" },
      headers: { "Authorization": "Bearer token123" },
      searchParams: { page: "1", limit: "10" },
      timeout: { request: 5000, response: 10000 },
      retry: { limit: 3, methods: ["GET", "POST"] },
      redirect: { follow: true, max: 5 },
      context: { requestId: "abc-123" },
    });
  });
});

describe("mergeAndNormalize", () => {
  bench("merge then normalize", () => {
    mergeAndNormalize(baseOptions, overrideOptions);
  });
});
