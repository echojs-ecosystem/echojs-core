import { describe, expect, it, vi } from "vitest";

import { attachInputMask, formatMaskedValue, parseMaskPattern, resolveMaskPattern } from "./index";

describe("input-mask", () => {
  it("formats phone mask", () => {
    const tokens = parseMaskPattern(resolveMaskPattern("phone"));
    expect(formatMaskedValue("11987654321", tokens).masked).toBe("(11) 98765-4321");
    expect(formatMaskedValue("11987654321", tokens).unmasked).toBe("11987654321");
  });

  it("formats cpf mask progressively", () => {
    const tokens = parseMaskPattern("999.999.999-99");
    expect(formatMaskedValue("123", tokens).masked).toBe("123.");
    expect(formatMaskedValue("12345678901", tokens).masked).toBe("123.456.789-01");
  });

  it("attachInputMask updates input value on type", () => {
    const input = document.createElement("input");
    const onValueChange = vi.fn();

    const dispose = attachInputMask(input, { mask: "phone", onValueChange });
    input.value = "11";
    input.dispatchEvent(new Event("input"));

    expect(input.value.startsWith("(11")).toBe(true);
    expect(onValueChange).toHaveBeenCalled();

    dispose();
  });
});
