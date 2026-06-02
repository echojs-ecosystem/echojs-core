// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { mountUI } from "../../test-utils";
import { UIProvider } from "../../providers";
import { createTheme } from "../../theme/create-theme";
import { Checkbox, checkboxStyles } from "./index";

describe("Checkbox", () => {
  describe("rendering", () => {
    it("renders a native checkbox input", () => {
      const node = Checkbox({}) as HTMLInputElement;
      expect(node.tagName.toLowerCase()).toBe("input");
      expect(node.type).toBe("checkbox");
    });

    it("does not leak size variant onto the DOM element", () => {
      const node = Checkbox({ size: "lg" }) as HTMLInputElement;
      expect(node.getAttribute("size")).toBeNull();
    });

    it("forwards name and value", () => {
      const node = Checkbox({ name: "terms", value: "yes" }) as HTMLInputElement;
      expect(node.name).toBe("terms");
      expect(node.value).toBe("yes");
    });
  });

  describe("variants", () => {
    it("applies size classes", () => {
      const node = Checkbox({ size: "lg" }) as HTMLInputElement;
      expect(node.className).toContain("h-6");
      expect(node.className).toContain("w-6");
    });

    it("local size overrides provider default", () => {
      const theme = createTheme({
        components: { checkbox: { defaultVariants: { size: "sm" } } },
      });

      const container = mountUI(
        () => Checkbox({ size: "lg" }),
        { theme },
      );
      const node = container.querySelector("input") as HTMLInputElement;
      expect(node.className).toContain("h-6");
    });
  });

  describe("state", () => {
    it("reflects checked", () => {
      const node = Checkbox({ checked: true }) as HTMLInputElement;
      expect(node.checked).toBe(true);
      expect(node.getAttribute("aria-checked")).toBe("true");
    });

    it("sets disabled and data-disabled", () => {
      const node = Checkbox({ disabled: true }) as HTMLInputElement;
      expect(node.disabled).toBe(true);
      expect(node.hasAttribute("data-disabled")).toBe(true);
    });

    it("sets aria-invalid and data-invalid when invalid", () => {
      const node = Checkbox({ invalid: true }) as HTMLInputElement;
      expect(node.getAttribute("aria-invalid")).toBe("true");
      expect(node.hasAttribute("data-invalid")).toBe(true);
    });

    it("sets aria-checked=mixed and DOM indeterminate when indeterminate", () => {
      const node = Checkbox({ indeterminate: true, checked: false }) as HTMLInputElement;
      expect(node.getAttribute("aria-checked")).toBe("mixed");
      expect(node.indeterminate).toBe(true);
      expect(node.hasAttribute("data-indeterminate")).toBe(true);
    });

    it("sets aria-required when required", () => {
      const node = Checkbox({ required: true }) as HTMLInputElement;
      expect(node.getAttribute("aria-required")).toBe("true");
      expect(node.required).toBe(true);
    });
  });

  describe("headless", () => {
    it("omits visual classes when headless", () => {
      const node = Checkbox({ headless: true, size: "md" }) as HTMLInputElement;
      expect(node.className).toBe("");
    });
  });

  describe("provider", () => {
    it("applies provider theme className", () => {
      const theme = createTheme({
        components: {
          checkbox: { className: "provider-checkbox" },
        },
      });

      const container = mountUI(() => Checkbox({}), { theme });
      const node = container.querySelector("input") as HTMLInputElement;
      expect(node.className).toContain("provider-checkbox");
    });

    it("uses provider defaultVariants for size", () => {
      const theme = createTheme({
        components: { checkbox: { defaultVariants: { size: "sm" } } },
      });

      const container = mountUI(() => Checkbox({}), { theme });
      const node = container.querySelector("input") as HTMLInputElement;
      expect(node.className).toContain("h-4");
    });
  });

  describe("checkboxStyles", () => {
    it("exposes size variant keys", () => {
      expect(checkboxStyles({ size: "md" })).toContain("h-5");
    });
  });
});
