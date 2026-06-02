// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render } from "@echojs/hyperdom";

import { InputMask } from "./index";

describe("InputMask", () => {
  it("renders masked input", () => {
    const node = InputMask({ mask: "phone", placeholder: "Phone" }) as HTMLInputElement;
    expect(node.tagName).toBe("INPUT");
  });

  it("formats value via attachInputMask", () => {
    const onMaskValueChange = vi.fn();
    const container = document.createElement("div");
    render(() => InputMask({ mask: "phone", onMaskValueChange }), container);
    const node = container.querySelector("input")!;

    node.value = "11987654321";
    node.dispatchEvent(new Event("input"));

    expect(node.value).toContain("(");
    expect(onMaskValueChange).toHaveBeenCalled();
  });
});
