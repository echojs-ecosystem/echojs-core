import { describe, expect, it } from "vitest";

import { mockMatchMedia } from "../../test-utils";
import { colorScheme as createColorScheme } from "./color-scheme";

describe("colorScheme", () => {
  it("resolves and toggles color scheme", () => {
    mockMatchMedia(false);
    const scheme = createColorScheme("light");
    expect(scheme.value()).toBe("light");

    scheme.set("dark");
    expect(scheme.value()).toBe("dark");
    expect(document.documentElement.dataset.colorScheme).toBe("dark");

    scheme.toggle();
    expect(scheme.value()).toBe("light");
    scheme.dispose();
  });
});
