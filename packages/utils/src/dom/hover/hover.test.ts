import { describe, expect, it } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { hover as createHover } from "./hover";

describe("hover", () => {
  it("tracks hover state", () => {
    const el = document.createElement("div");
    const hover = createHover(signal(el));
    expect(hover.value()).toBe(false);
    el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    expect(hover.value()).toBe(true);
    el.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    expect(hover.value()).toBe(false);
    hover.dispose();
  });
});
