import { describe, expect, it, vi } from "vitest";
import { createMemoryUrlStateAdapter, createQueryParam, debounce, parseAsInteger } from "@echojs/url-state";

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("debounce", () => {
  it("обновляет URL после задержки, last wins", async () => {
    vi.useFakeTimers();
    const adapter = createMemoryUrlStateAdapter("?page=1");
    const page = createQueryParam("page", parseAsInteger.withDefault(1), {
      adapter,
      limitUrlUpdates: debounce(100),
    });

    page.set(2);
    page.set(3);
    expect(page.value()).toBe(3);
    await flush();
    expect(adapter.getSearch()).toBe("?page=1");

    vi.advanceTimersByTime(99);
    await flush();
    expect(adapter.getSearch()).toBe("?page=1");

    vi.advanceTimersByTime(1);
    await flush();
    expect(adapter.getSearch()).toBe("?page=3");

    vi.useRealTimers();
  });
});

