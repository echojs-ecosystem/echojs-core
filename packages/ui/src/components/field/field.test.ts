// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { Field, Input } from "../../index";

describe("Field", () => {
  it("function children receives inputProps and wires aria ids", () => {
    const node = Field({
      label: "Email",
      description: "We do not spam",
      error: "Invalid",
      children: ({ inputProps }) => Input({ ...inputProps, placeholder: "Email" } as any),
    }) as HTMLDivElement;

    const input = node.querySelector("input")!;
    expect(input.getAttribute("aria-labelledby")).toBeTruthy();
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
    expect(input.getAttribute("aria-invalid")).toBe("true");

    const error = node.querySelector('[role="alert"]')!;
    expect(error).toBeTruthy();
  });

  it("simple children mode works", () => {
    const node = Field({
      label: "Email",
      children: Input({ placeholder: "Email" } as any),
    }) as HTMLDivElement;

    expect(node.querySelector("label")).toBeTruthy();
    expect(node.querySelector("input")).toBeTruthy();
  });
});

