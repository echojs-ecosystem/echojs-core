import { describe, expect, it } from "vitest";

import { toggle as createToggle } from "./toggle";

describe("toggle", () => {
  it("toggles boolean state", () => {
    const toggle = createToggle(false);
    expect(toggle.value()).toBe(false);
    toggle.on();
    expect(toggle.value()).toBe(true);
    toggle.toggle();
    expect(toggle.value()).toBe(false);
    toggle.set(true);
    expect(toggle.value()).toBe(true);
  });
});
