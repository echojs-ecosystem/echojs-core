import { bench, describe } from "vitest";
import { createHttpClient } from "../../src/http/index";

describe("createHttpClient", () => {
  bench("create client with defaults", () => {
    createHttpClient({
      baseUrl: "https://api.example.com",
    });
  });

  bench("create client with full config", () => {
    createHttpClient({
      baseUrl: "https://api.example.com",
      headers: { "Authorization": "Bearer token" },
      timeout: { request: 5000, response: 10000 },
      retry: { limit: 3 },
      redirect: { follow: true, max: 10 },
      hooks: {
        init: [],
        beforeRequest: [(options) => options],
        afterResponse: [(response) => response],
      },
    });
  });

  bench("create client with hooks only", () => {
    createHttpClient({
      hooks: {
        init: [(options) => options],
        beforeRequest: [(options) => options],
        beforeRedirect: [(options) => options],
        beforeRetry: [(options) => options],
        afterResponse: [(response) => response],
        beforeError: [(error) => error],
      },
    });
  });

  bench("extend client", () => {
    const client = createHttpClient({ baseUrl: "https://api.example.com" });
    client.extend({ headers: { "X-Extended": "true" } });
  });

  bench("extend client with hooks", () => {
    const client = createHttpClient({
      baseUrl: "https://api.example.com",
      hooks: {
        beforeRequest: [(options) => options],
      },
    });
    client.extend({
      hooks: {
        afterResponse: [(response) => response],
      },
    });
  });
});
