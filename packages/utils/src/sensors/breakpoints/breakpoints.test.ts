import { describe, expect, it, vi } from "vitest";

import { breakpoints as createBreakpoints } from "./breakpoints";

describe("breakpoints", () => {
  it("resolves current breakpoint", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(800);
    const bp = createBreakpoints({ sm: 640, md: 768, lg: 1024 });
    expect(bp.current()).toBe("md");
    expect(bp.greaterOrEqual("md")).toBe(true);
    expect(bp.smaller("lg")).toBe(true);
    bp.dispose();
  });

  it("updates current breakpoint on resize", () => {
    const width = vi.spyOn(window, "innerWidth", "get");
    width.mockReturnValue(500);
    const bp = createBreakpoints({ sm: 640, md: 768 });

    expect(bp.current()).toBe("sm");
    expect(bp.smaller("md")).toBe(true);
    expect(bp.greaterOrEqual("lg")).toBe(false);

    width.mockReturnValue(1300);
    window.dispatchEvent(new Event("resize"));
    expect(bp.current()).toBe("xl");
    expect(bp.greaterOrEqual("lg")).toBe(true);

    bp.dispose();
  });
});
