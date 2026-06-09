import { describe, expect, it, vi } from "vitest";

import { createCleanupScope } from "./cleanup";

describe("createCleanupScope", () => {
  it("runs cleanups in reverse order on dispose", () => {
    const order: number[] = [];
    const scope = createCleanupScope();
    scope.add(() => order.push(1));
    scope.add(() => order.push(2));
    scope.dispose();
    expect(order).toEqual([2, 1]);
  });

  it("ignores cleanups added after dispose", () => {
    const fn = vi.fn();
    const scope = createCleanupScope();
    scope.dispose();
    scope.add(fn);
    expect(fn).not.toHaveBeenCalled();
  });

  it("continues cleanup when a callback throws", () => {
    const second = vi.fn();
    const scope = createCleanupScope();
    scope.add(() => {
      throw new Error("cleanup failed");
    });
    scope.add(second);
    scope.dispose();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("is idempotent on repeated dispose", () => {
    const fn = vi.fn();
    const scope = createCleanupScope();
    scope.add(fn);
    scope.dispose();
    scope.dispose();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
