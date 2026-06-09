import { describe, expect, it, vi } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { clickOutside as createClickOutside } from "./click-outside";

describe("clickOutside", () => {
  it("fires when clicking outside target", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const outside = document.createElement("button");
    document.body.appendChild(outside);

    const handler = vi.fn();
    const clickOutside = createClickOutside(signal(target), handler);

    outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    clickOutside.dispose();
    document.body.removeChild(target);
    document.body.removeChild(outside);
  });

  it("supports getter targets", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const outside = document.createElement("button");
    document.body.appendChild(outside);

    const handler = vi.fn();
    const clickOutside = createClickOutside(() => target, handler);

    outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    clickOutside.dispose();
    document.body.removeChild(target);
    document.body.removeChild(outside);
  });

  it("fires on touchstart outside target", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const outside = document.createElement("button");
    document.body.appendChild(outside);

    const handler = vi.fn();
    const clickOutside = createClickOutside(signal(target), handler);

    outside.dispatchEvent(new TouchEvent("touchstart", { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    clickOutside.dispose();
    document.body.removeChild(target);
    document.body.removeChild(outside);
  });
});
