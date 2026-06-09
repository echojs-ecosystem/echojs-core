import { describe, expect, it } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { mockResizeObserver } from "../../test-utils";
import { elementSize as createElementSize } from "./element-size";

describe("elementSize", () => {
  it("reads element dimensions", () => {
    const instances = mockResizeObserver();
    const el = document.createElement("div");
    const $el = signal<HTMLElement | null>(el);

    const size = createElementSize($el);
    instances[0]?.trigger({ contentRect: { width: 120, height: 80 } });
    expect(size.width()).toBe(120);
    expect(size.height()).toBe(80);
    size.dispose();
  });
});
