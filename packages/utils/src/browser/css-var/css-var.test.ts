import { describe, expect, it } from "vitest";

import { cssVar as createCssVar } from "./css-var";

describe("cssVar", () => {
  it("reads and sets css variables", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const cssVar = createCssVar("test-color", el, "");
    cssVar.set("#ff0000");
    expect(cssVar.value()).toBe("#ff0000");
    cssVar.dispose();
    document.body.removeChild(el);
  });
});
