import { describe, expect, it } from "vitest";
import { createMemoryUrlStateAdapter, createQueryParams, parseAsFloat } from "@echojs/url-state";

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("urlKeys", () => {
  it("remaps keys and preserves unrelated params", async () => {
    const adapter = createMemoryUrlStateAdapter("?x=1");
    const coordinates = createQueryParams(
      {
        latitude: parseAsFloat.withDefault(45.18),
        longitude: parseAsFloat.withDefault(5.72),
      },
      {
        adapter,
        urlKeys: {
          latitude: "lat",
          longitude: "lng",
        },
      },
    );

    coordinates.set({ latitude: 1, longitude: 2 });
    await flush();
    expect(adapter.getSearch()).toBe("?lat=1&lng=2&x=1");
  });
});

