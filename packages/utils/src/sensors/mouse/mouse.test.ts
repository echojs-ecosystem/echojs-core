import { describe, expect, it } from "vitest";

import { mouse as createMouse } from "./mouse";

describe("mouse", () => {
  it("tracks pointer coordinates", () => {
    const mouse = createMouse();
    document.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: 20 }));
    expect(mouse.x()).toBe(10);
    expect(mouse.y()).toBe(20);
    expect(mouse.sourceType()).toBe("mouse");
    mouse.dispose();
  });
});
