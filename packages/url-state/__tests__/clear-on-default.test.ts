import { describe, expect, it } from "vitest";
import { createMemoryUrlStateAdapter, createQueryParam, parseAsInteger } from "@echojs/url-state";

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("clearOnDefault", () => {
  it("default: true removes default value from URL", async () => {
    const adapter = createMemoryUrlStateAdapter("");
    const page = createQueryParam("page", parseAsInteger.withDefault(1), { adapter, clearOnDefault: true });
    page.set(1);
    await flush();
    expect(adapter.getSearch()).toBe("");
  });

  it("clearOnDefault: false keeps default value in URL", async () => {
    const adapter = createMemoryUrlStateAdapter("");
    const page = createQueryParam("page", parseAsInteger.withDefault(1), { adapter, clearOnDefault: false });
    page.set(1);
    await flush();
    expect(adapter.getSearch()).toBe("?page=1");
  });
});

