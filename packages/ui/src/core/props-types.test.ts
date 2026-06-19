import { describe, expect, it } from "vitest";

import { buildStripKeys, toDomProps } from "./props-types";

describe("toDomProps", () => {
  it("strips component-only keys before passing to h()", () => {
    const domProps = toDomProps<"button">(
      {
        variant: "primary",
        size: "md",
        headless: true,
        type: "button",
        disabled: true,
        onClick: () => {},
      },
      buildStripKeys(["variant", "size", "leftIcon"]),
    );

    expect(domProps).toEqual({
      type: "button",
      disabled: true,
      onClick: expect.any(Function),
    });
    expect(domProps).not.toHaveProperty("variant");
    expect(domProps).not.toHaveProperty("headless");
  });
});
