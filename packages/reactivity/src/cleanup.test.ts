import { describe, expect, it, vi } from "vitest";

import { cleanup } from "./cleanup";
import { scope } from "./scope";

describe("cleanup()", () => {
  it("бросает TypeError на неправильный fn", () => {
    expect(() => (cleanup as any)(null)).toThrow(TypeError);
  });

  it("бросает вне scope()", () => {
    expect(() => cleanup(() => {})).toThrow(/scope/i);
  });

  it("выполняет callback при dispose scope", () => {
    const spy = vi.fn();
    const stop = scope(() => {
      cleanup(spy);
    });

    stop();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("не ломает dispose, если callback бросает", () => {
    const spy = vi.fn();
    const stop = scope(() => {
      cleanup(() => {
        throw new Error("boom");
      });
      cleanup(spy);
    });

    stop();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
