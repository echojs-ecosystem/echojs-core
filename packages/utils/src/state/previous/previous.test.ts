import { describe, expect, it } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { previous as createPrevious } from "./previous";

describe("previous", () => {
  it("tracks previous signal value", () => {
    const $source = signal(1);
    const previous = createPrevious($source);
    expect(previous.value()).toBeUndefined();

    $source.set(2);
    expect(previous.value()).toBe(1);

    $source.set(3);
    expect(previous.value()).toBe(2);
    previous.dispose();
  });
});
