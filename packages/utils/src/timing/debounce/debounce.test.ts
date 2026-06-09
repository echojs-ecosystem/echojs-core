import { afterEach, describe, expect, it, vi } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { debounce, debounceFn } from "./debounce";

describe("debounce", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces signal updates", () => {
    vi.useFakeTimers();
    const $source = signal("a");
    const debounced = debounce($source, 300);

    $source.set("b");
    expect(debounced.value()).toBe("a");
    vi.advanceTimersByTime(300);
    expect(debounced.value()).toBe("b");
    debounced.dispose();
  });

  it("debounces function calls", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounceFn(fn, 200);

    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);

    debounced.cancel();
    debounced();
    debounced.flush();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("dispose cancels pending debounced update", () => {
    vi.useFakeTimers();
    const $source = signal(1);
    const debounced = debounce($source, 300);

    $source.set(2);
    debounced.dispose();
    vi.advanceTimersByTime(300);
    expect(debounced.value()).toBe(1);
  });
});
