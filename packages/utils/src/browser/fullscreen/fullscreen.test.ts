import { describe, expect, it, vi } from "vitest";

import { fullscreen as createFullscreen } from "./fullscreen";

describe("fullscreen", () => {
  it("exposes fullscreen state", () => {
    const fs = createFullscreen();
    expect(fs.isFullscreen()).toBe(false);
    fs.dispose();
  });

  it("enters, toggles, and exits fullscreen", async () => {
    const el = document.documentElement;
    el.requestFullscreen = vi.fn().mockResolvedValue(undefined);
    document.exitFullscreen = vi.fn().mockResolvedValue(undefined);

    const fs = createFullscreen(el);
    await fs.enter();
    expect(el.requestFullscreen).toHaveBeenCalled();

    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: el,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    expect(fs.isFullscreen()).toBe(true);

    await fs.toggle();
    expect(document.exitFullscreen).toHaveBeenCalled();

    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: null,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    expect(fs.isFullscreen()).toBe(false);

    fs.dispose();
  });
});
