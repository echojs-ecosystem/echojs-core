import { afterEach, describe, expect, it, vi } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { throttle, throttleFn } from "./throttle";

describe("throttle", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("throttles signal updates", () => {
    vi.useFakeTimers();
    const $source = signal(1);
    const throttled = throttle($source, 100);

    $source.set(2);
    vi.advanceTimersByTime(100);
    expect(throttled.value()).toBe(2);

    $source.set(3);
    expect(throttled.value()).toBe(2);
    vi.advanceTimersByTime(100);
    expect(throttled.value()).toBe(3);
    throttled.dispose();
  });

  it("throttles function calls", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttleFn(fn, 100);

    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("dispose stops pending throttled updates", () => {
    vi.useFakeTimers();
    const $source = signal(1);
    const throttled = throttle($source, 100);

    $source.set(2);
    throttled.dispose();
    vi.advanceTimersByTime(100);
    expect(throttled.value()).toBe(1);
  });
});
