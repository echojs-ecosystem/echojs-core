import { describe, expect, it } from "vitest";
import {
  createMemoryUrlStateAdapter,
  createQueryParam,
  createQueryParams,
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
} from "@echojs/url-state";

const flush = async (): Promise<void> => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("defaultVisibility", () => {
  it('"hide" omits defaults from URL', async () => {
    const adapter = createMemoryUrlStateAdapter("");
    const page = createQueryParam("page", parseAsInteger.withDefault(1), {
      adapter,
      defaultVisibility: "hide",
    });
    page.set(1);
    await flush();
    expect(adapter.getSearch()).toBe("");
  });

  it('"show" keeps defaults in URL', async () => {
    const adapter = createMemoryUrlStateAdapter("");
    const page = createQueryParam("page", parseAsInteger.withDefault(1), {
      adapter,
      defaultVisibility: "show",
    });
    page.set(1);
    await flush();
    expect(adapter.getSearch()).toBe("?page=1");
  });

  it('createQueryParams "show" writes defaults to URL on init', async () => {
    const adapter = createMemoryUrlStateAdapter("");
    createQueryParams({ page: parseAsInteger.withDefault(1) }, { adapter, defaultVisibility: "show" });
    await flush();
    expect(adapter.getSearch()).toBe("?page=1");
  });

  it('createQueryParams "show" serializes defaults (products-like schema)', async () => {
    const adapter = createMemoryUrlStateAdapter("");
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(""),
        page: parseAsInteger.withDefault(1),
        inStock: parseAsBoolean.withDefault(false),
        sort: parseAsLiteral(["relevance", "name"] as const).withDefault("relevance"),
      },
      { adapter, defaultVisibility: "show", urlKeys: { inStock: "stock" } },
    );

    filters.set({ q: "", page: 1, inStock: false, sort: "relevance" });
    await flush();
    expect(adapter.getSearch()).toContain("page=1");
    expect(adapter.getSearch()).toContain("stock=false");
    expect(adapter.getSearch()).toContain("sort=relevance");
  });

  it("applies to createQueryParams group", async () => {
    const adapter = createMemoryUrlStateAdapter("");
    const filters = createQueryParams(
      { page: parseAsInteger.withDefault(1), size: parseAsInteger.withDefault(10) },
      { adapter, defaultVisibility: "hide" },
    );
    filters.set({ page: 1, size: 10 });
    await flush();
    expect(adapter.getSearch()).toBe("");
  });
});
