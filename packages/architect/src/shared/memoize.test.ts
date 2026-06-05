import { describe, expect, it, vi } from "vitest";
import { memoize } from "./memoize";

describe("memoize", () => {
  it("caches result for the same argument", () => {
    const fn = vi.fn((value: { id: number }) => value.id * 2);
    const memoized = memoize(fn);
    const arg = { id: 2 };

    expect(memoized(arg)).toBe(4);
    expect(memoized(arg)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("preserves this binding", () => {
    const ctx = { multiplier: 3 };
    const fn = vi.fn(function (this: typeof ctx, value: { n: number }) {
      return value.n * this.multiplier;
    });
    const memoized = memoize(fn);
    const arg = { n: 4 };

    expect(memoized.call(ctx, arg)).toBe(12);
    expect(memoized.call(ctx, arg)).toBe(12);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
