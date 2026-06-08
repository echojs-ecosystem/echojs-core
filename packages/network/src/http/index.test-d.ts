import { describe, expectTypeOf, it } from "vitest";

import { createHttpClient, fetchAdapter, isHttpError, mergeRequestOptions } from "./index";
import type { HttpClient, RequestOptions } from "./index";

describe("http public API types", () => {
  it("types createHttpClient defaults", () => {
    const client = createHttpClient({ baseUrl: "https://api.example.com" });
    expectTypeOf(client).toEqualTypeOf<HttpClient>();
    expectTypeOf(client.defaults).toMatchTypeOf<Readonly<RequestOptions>>();
  });

  it("types request options", () => {
    const options: RequestOptions = {
      method: "POST",
      json: { ok: true },
    };
    expectTypeOf(options.method).toEqualTypeOf<RequestOptions["method"]>();
  });

  it("types error guards", () => {
    expectTypeOf(isHttpError).parameters.toEqualTypeOf<[unknown]>();
    expectTypeOf(isHttpError).returns.toEqualTypeOf<boolean>();
  });

  it("types option helpers", () => {
    const merged = mergeRequestOptions({ method: "GET" }, { url: "/users" });
    expectTypeOf(merged).toEqualTypeOf<RequestOptions>();
  });

  it("types fetch adapter", () => {
    expectTypeOf(fetchAdapter.name).toBeString();
    expectTypeOf(fetchAdapter.execute).toBeFunction();
  });
});
