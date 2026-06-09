import { describe, expect, it, vi } from "vitest";

import { keyPress as createKeyPress } from "./key-press";

describe("keyPress", () => {
  it("tracks key press state", () => {
    const handler = vi.fn();
    const key = createKeyPress("a", handler);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true }));
    expect(key.pressed()).toBe(true);
    expect(handler).toHaveBeenCalled();
    document.dispatchEvent(new KeyboardEvent("keyup", { key: "a", bubbles: true }));
    expect(key.pressed()).toBe(false);
    key.dispose();
  });
});
