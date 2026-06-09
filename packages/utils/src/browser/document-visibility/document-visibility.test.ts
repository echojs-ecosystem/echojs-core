import { describe, expect, it } from "vitest";

import { documentVisibility as createDocumentVisibility } from "./document-visibility";

describe("documentVisibility", () => {
  it("tracks visibility state", () => {
    const vis = createDocumentVisibility();
    expect(vis.visible()).toBe(true);
    expect(vis.hidden()).toBe(false);
    vis.dispose();
  });

  it("updates on visibilitychange", () => {
    const vis = createDocumentVisibility();

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(vis.value()).toBe("hidden");
    expect(vis.hidden()).toBe(true);
    expect(vis.visible()).toBe(false);

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(vis.visible()).toBe(true);

    vis.dispose();
  });
});
