import { describe, expect, it } from "vitest";

import { matchHotkey, parseHotkey } from "./hotkey";

describe("hotkey", () => {
  it("parses modifier combos", () => {
    expect(parseHotkey("ctrl+s")).toEqual({
      key: "s",
      ctrl: true,
      shift: false,
      alt: false,
      meta: false,
    });
  });

  it("matches keyboard events", () => {
    const parsed = parseHotkey("ctrl+s");
    const event = new KeyboardEvent("keydown", { key: "s", ctrlKey: true });
    expect(matchHotkey(event, parsed)).toBe(true);
  });
});
