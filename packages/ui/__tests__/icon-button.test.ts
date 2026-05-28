// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { IconButton } from "../src/index";

describe("IconButton", () => {
  it("throws in dev when aria-label is missing", () => {
    expect(() => IconButton({ children: "x" as any } as any)).toThrow(/aria-label/);
  });

  it("renders a button", () => {
    const node = IconButton({ "aria-label": "Close", children: "x" as any } as any) as HTMLButtonElement;
    expect(node.tagName.toLowerCase()).toBe("button");
  });
});

