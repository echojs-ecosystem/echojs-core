// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render } from "@echojs-ecosystem/hyperdom";

import { InputTags } from "./index";

describe("InputTags", () => {
  it("renders tags and input", () => {
    const node = InputTags({ value: ["a", "b"], placeholder: "Add" }) as HTMLDivElement;
    expect(node.querySelectorAll("[data-tag]").length).toBe(2);
    expect(node.querySelector("input")).not.toBeNull();
  });

  it("remove button drops tag", () => {
    const onValueChange = vi.fn();
    const container = document.createElement("div");
    render(() => InputTags({ value: ["a", "b"], onValueChange }), container);
    const removeBtn = container.querySelector('[aria-label="Remove a"]') as HTMLButtonElement;
    removeBtn.click();
    expect(onValueChange).toHaveBeenCalledWith(["b"]);
  });
});
