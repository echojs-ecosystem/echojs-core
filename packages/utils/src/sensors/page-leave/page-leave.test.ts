import { describe, expect, it, vi } from "vitest";

import { pageLeave as createPageLeave } from "./page-leave";

describe("pageLeave", () => {
  it("fires on mouseleave", () => {
    const handler = vi.fn();
    const pageLeave = createPageLeave(handler);
    document.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    expect(handler).toHaveBeenCalled();
    pageLeave.dispose();
  });
});
