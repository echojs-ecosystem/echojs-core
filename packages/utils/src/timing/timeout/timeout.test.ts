import { afterEach, describe, expect, it, vi } from "vitest";

import { timeout as createTimeout } from "./timeout";

describe("timeout", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts, stops, and restarts", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const timeout = createTimeout(fn, 1000);

    timeout.start();
    expect(timeout.pending()).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);

    timeout.restart();
    expect(timeout.pending()).toBe(true);
    timeout.stop();
    expect(timeout.pending()).toBe(false);
    timeout.dispose();
  });
});
