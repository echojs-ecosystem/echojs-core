import { afterEach, describe, expect, it, vi } from "vitest";

import { interval as createInterval } from "./interval";

describe("interval", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("runs callback on interval", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const interval = createInterval(fn, 500);

    interval.start();
    expect(interval.active()).toBe(true);
    vi.advanceTimersByTime(1500);
    expect(fn).toHaveBeenCalledTimes(3);

    interval.stop();
    expect(interval.active()).toBe(false);
    interval.dispose();
  });
});
