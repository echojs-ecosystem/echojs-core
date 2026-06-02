// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { Input } from "./index";

describe("Input", () => {
  it("renders native input", () => {
    const node = Input({ placeholder: "Email" }) as HTMLInputElement;
    expect(node.tagName.toLowerCase()).toBe("input");
    expect(node.getAttribute("placeholder")).toBe("Email");
  });

  it("sets aria-invalid and data-invalid", () => {
    const node = Input({ invalid: true } as any) as HTMLInputElement;
    expect(node.getAttribute("aria-invalid")).toBe("true");
    expect(node.hasAttribute("data-invalid")).toBe(true);
  });

  it("wraps when startContent/endContent provided", () => {
    const node = Input({
      startContent: "@",
      endContent: ".com",
      placeholder: "user",
    } as any) as HTMLDivElement;

    expect(node.tagName.toLowerCase()).toBe("div");
    expect(node.querySelector('[data-input-slot="start"]')?.textContent).toBe("@");
    expect(node.querySelector('[data-input-slot="end"]')?.textContent).toBe(".com");
    const input = node.querySelector("input")!;
    expect(input.getAttribute("placeholder")).toBe("user");
  });

  it("headless skips visual classes", () => {
    const node = Input({ headless: true, placeholder: "Email" } as any) as HTMLInputElement;
    expect(node.className).toBe("");
  });
});
