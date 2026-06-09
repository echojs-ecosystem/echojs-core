import { describe, expect, it } from "vitest";

import { devicePixelRatio as createDevicePixelRatio } from "./device-pixel-ratio";

describe("devicePixelRatio", () => {
  it("reads device pixel ratio", () => {
    const dpr = createDevicePixelRatio();
    expect(dpr.value()).toBeGreaterThan(0);
    dpr.dispose();
  });
});
