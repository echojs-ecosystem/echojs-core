import { describe, expect, it } from "vitest";
import type { UrlStateAdapter } from "@echojs/url-state";
import { createQueryParams, parseAsInteger, parseAsString } from "@echojs/url-state";

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("batching", () => {
  it("createQueryParams.set делает один URL update", async () => {
    let search = "";
    let calls = 0;
    const adapter: UrlStateAdapter = {
      kind: "test",
      getSearch: () => search,
      setSearch: (next) => {
        search = next;
        calls += 1;
      },
      subscribe: () => () => {},
    };

    const filters = createQueryParams(
      { q: parseAsString.withDefault(""), page: parseAsInteger.withDefault(1) },
      { adapter },
    );

    filters.set({ q: "bike", page: 2 });
    await flush();
    expect(calls).toBe(1);
    expect(search).toBe("?page=2&q=bike");
  });
});

