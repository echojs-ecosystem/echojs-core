import { describe, expect, it, vi } from "vitest";

import { eventListener } from "./event-listener";

describe("eventListener", () => {
  it("attaches and detaches listeners", () => {
    const handler = vi.fn();
    const target = document.createElement("div");
    const { dispose } = eventListener(target, "click", handler);

    target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    dispose();
    target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
