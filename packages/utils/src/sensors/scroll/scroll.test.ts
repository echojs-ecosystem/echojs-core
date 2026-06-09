import { afterEach, describe, expect, it, vi } from "vitest";

import { scroll as createScroll } from "./scroll";

describe("scroll", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("tracks scroll position", () => {
    vi.spyOn(window, "scrollX", "get").mockReturnValue(12);
    vi.spyOn(window, "scrollY", "get").mockReturnValue(34);

    const scroll = createScroll(window);
    expect(scroll.x()).toBe(12);
    expect(scroll.y()).toBe(34);
    scroll.dispose();
  });

  it("tracks element scroll position", () => {
    const el = document.createElement("div");
    Object.defineProperty(el, "scrollLeft", { configurable: true, value: 8 });
    Object.defineProperty(el, "scrollTop", { configurable: true, value: 16 });

    const scroll = createScroll(el);
    expect(scroll.x()).toBe(8);
    expect(scroll.y()).toBe(16);
    scroll.dispose();
  });

  it("sets isScrolling during scroll and clears after idle timeout", () => {
    vi.useFakeTimers();
    vi.spyOn(window, "scrollX", "get").mockReturnValue(0);
    vi.spyOn(window, "scrollY", "get").mockReturnValue(0);

    const scroll = createScroll(window, { idleTimeout: 100 });
    window.dispatchEvent(new Event("scroll"));
    expect(scroll.isScrolling()).toBe(true);

    vi.advanceTimersByTime(100);
    expect(scroll.isScrolling()).toBe(false);
    scroll.dispose();
  });
});
