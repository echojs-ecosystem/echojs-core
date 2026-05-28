// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { Label } from "../src/index";

describe("Label", () => {
  it("renders native label with for", () => {
    const node = Label({ for: "email", children: "Email" } as any) as HTMLLabelElement;
    expect(node.tagName.toLowerCase()).toBe("label");
    expect(node.getAttribute("for")).toBe("email");
  });

  it("shows required indicator by default", () => {
    const node = Label({ for: "x", required: true, children: "Email" } as any) as HTMLLabelElement;
    expect(node.textContent).toContain("*");
  });

  it("shows optional indicator when provided and required=false", () => {
    const node = Label({
      for: "x",
      required: false,
      optionalIndicator: "(optional)" as any,
      children: "Email",
    } as any) as HTMLLabelElement;
    expect(node.textContent).toContain("(optional)");
  });
});

