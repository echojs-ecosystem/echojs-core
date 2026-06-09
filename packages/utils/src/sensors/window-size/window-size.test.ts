import { describe, expect, it, vi } from "vitest";

import { windowSize as createWindowSize } from "./window-size";

describe("windowSize", () => {
  it("reads window dimensions", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(768);

    const size = createWindowSize();
    expect(size.width()).toBe(1024);
    expect(size.height()).toBe(768);
    size.dispose();
  });

  it("updates on resize", () => {
    const size = createWindowSize();
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(500);
    window.dispatchEvent(new Event("resize"));
    expect(size.width()).toBe(500);
    size.dispose();
  });

  it("uses SSR-safe defaults without window", () => {
    vi.restoreAllMocks();
    const size = createWindowSize({
      initialWidth: 320,
      initialHeight: 480,
      window: undefined,
    });
    expect(size.width()).toBe(320);
    expect(size.height()).toBe(480);
    size.dispose();
  });

  it("dispose removes resize listener", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const size = createWindowSize();
    const resizeCalls = addSpy.mock.calls.filter(([event]) => event === "resize").length;
    expect(resizeCalls).toBeGreaterThan(0);

    size.dispose();
    const removed = removeSpy.mock.calls.filter(([event]) => event === "resize").length;
    expect(removed).toBeGreaterThan(0);
  });
});
