import { describe, expect, it } from "vitest";
import {
  createMemoryUrlStateAdapter,
  createQueryParams,
  parseAsNativeArrayOf,
  parseAsString,
} from "@echojs/url-state";

const flush = async (): Promise<void> => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("parseAsNativeArrayOf", () => {
  it("parse repeated keys", () => {
    const tags = parseAsNativeArrayOf(parseAsString);
    expect(tags.parse(["phone", "lamp"])).toEqual(["phone", "lamp"]);
    expect(tags.parse(null)).toEqual([]);
  });

  it("serialize repeated keys", () => {
    const tags = parseAsNativeArrayOf(parseAsString);
    expect(tags.serialize(["a", "b"])).toEqual(["a", "b"]);
  });

  it("works in createQueryParams", async () => {
    const adapter = createMemoryUrlStateAdapter("?tag=phone&tag=lamp");
    const state = createQueryParams(
      { tag: parseAsNativeArrayOf(parseAsString) },
      { adapter, defaultVisibility: "hide" },
    );
    expect(state.value().tag).toEqual(["phone", "lamp"]);

    state.set({ tag: ["pad"] });
    await flush();
    expect(adapter.getSearch()).toBe("?tag=pad");
  });
});
