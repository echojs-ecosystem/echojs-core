import { describe, expect, it, vi } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { mockResizeObserver } from "../../test-utils";
import { resizeObserver as createResizeObserver } from "./resize-observer";

describe("resizeObserver", () => {
  it("invokes callback on resize", () => {
    const instances = mockResizeObserver();
    const $el = signal(document.createElement("div"));
    const callback = vi.fn();

    const observer = createResizeObserver($el, callback);
    instances[0]?.trigger({ contentRect: { width: 200, height: 100 } });
    expect(callback).toHaveBeenCalled();
    observer.dispose();
  });
});
