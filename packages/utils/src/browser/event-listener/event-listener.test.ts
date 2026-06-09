import { describe, expect, it, vi } from "vitest";

import { eventListener } from "./event-listener";

describe("eventListener (browser entry)", () => {
  it("re-exports core helper", () => {
    const handler = vi.fn();
    const el = document.createElement("button");
    const { dispose } = eventListener(el, "click", handler);
    el.click();
    expect(handler).toHaveBeenCalled();
    dispose();
  });
});
