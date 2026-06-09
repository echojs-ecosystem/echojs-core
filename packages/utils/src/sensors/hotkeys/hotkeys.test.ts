import { describe, expect, it, vi } from "vitest";

import { hotkeys as createHotkeys } from "./hotkeys";

describe("hotkeys", () => {
  it("invokes handler on matching hotkey", () => {
    const handler = vi.fn();
    const hotkeys = createHotkeys("ctrl+s", handler);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "s", ctrlKey: true, bubbles: true }));
    expect(handler).toHaveBeenCalled();
    hotkeys.dispose();
  });
});
