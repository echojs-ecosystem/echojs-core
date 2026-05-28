// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { Textarea } from "../src/index";

describe("Textarea", () => {
  it("renders native textarea", () => {
    const node = Textarea({ placeholder: "Message" } as any) as HTMLTextAreaElement;
    expect(node.tagName.toLowerCase()).toBe("textarea");
    expect(node.getAttribute("placeholder")).toBe("Message");
  });

  it("invalid sets aria-invalid and data-invalid", () => {
    const node = Textarea({ invalid: true } as any) as HTMLTextAreaElement;
    expect(node.getAttribute("aria-invalid")).toBe("true");
    expect(node.hasAttribute("data-invalid")).toBe(true);
  });

  it("headless skips visual classes", () => {
    const node = Textarea({ headless: true } as any) as HTMLTextAreaElement;
    expect(node.className).toBe("");
  });
});

