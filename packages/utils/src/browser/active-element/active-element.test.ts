import { describe, expect, it } from "vitest";

import { activeElement as createActiveElement } from "./active-element";

describe("activeElement", () => {
  it("tracks document active element", () => {
    const active = createActiveElement();
    expect(active.value()).toBe(document.activeElement);
    active.dispose();
  });
});
