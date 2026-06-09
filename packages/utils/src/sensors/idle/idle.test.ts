import { afterEach, describe, expect, it, vi } from "vitest";

import { idle as createIdle } from "./idle";

describe("idle", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("becomes idle after timeout", () => {
    vi.useFakeTimers();
    const idle = createIdle({ timeout: 1000 });
    expect(idle.idle()).toBe(false);
    vi.advanceTimersByTime(1000);
    expect(idle.idle()).toBe(true);
    idle.reset();
    expect(idle.idle()).toBe(false);
    idle.dispose();
  });
});
