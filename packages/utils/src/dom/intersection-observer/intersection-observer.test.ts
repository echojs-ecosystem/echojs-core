import { describe, expect, it } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { mockIntersectionObserver } from "../../test-utils";
import { intersectionObserver as createIntersectionObserver } from "./intersection-observer";

describe("intersectionObserver", () => {
  it("tracks intersection state", () => {
    const instances = mockIntersectionObserver();
    const $el = signal(document.createElement("div"));
    const visibility = createIntersectionObserver($el);

    instances[0]?.trigger(true);
    expect(visibility.isIntersecting()).toBe(true);
    expect(visibility.entry()?.isIntersecting).toBe(true);

    instances[0]?.trigger(false);
    expect(visibility.isIntersecting()).toBe(false);
    visibility.dispose();
  });
});
