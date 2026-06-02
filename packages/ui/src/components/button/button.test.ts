// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render } from "@echojs/hyperdom";

import { UIProvider } from "../../providers";
import { createTheme } from "../../theme/create-theme";
import { Button, buttonStyles } from "./index";

describe("Button", () => {
  describe("rendering", () => {
    it("renders button", () => {
      const node = Button({ children: "Save" }) as HTMLButtonElement;
      expect(node.tagName).toBe("BUTTON");
    });

    it("renders children", () => {
      const node = Button({ children: "Save" }) as HTMLButtonElement;
      expect(node.textContent).toBe("Save");
    });

    it("default type is button", () => {
      const node = Button({ children: "Save" }) as HTMLButtonElement;
      expect(node.getAttribute("type")).toBe("button");
    });

    it("defaults to pill radius (rounded-3xl / full override)", () => {
      const node = Button({ children: "Save" }) as HTMLButtonElement;
      expect(node.className).toContain("rounded-3xl");
    });
  });

  describe("variants", () => {
    it("applies danger variant tokens", () => {
      const node = Button({ variant: "danger", children: "X" }) as HTMLButtonElement;
      expect(node.className).toContain("[--button-bg:var(--color-danger)]");
    });

    it("maps deprecated destructive to danger styles", () => {
      const node = Button({ variant: "destructive", children: "X" }) as HTMLButtonElement;
      expect(node.className).toContain("[--button-bg:var(--color-danger)]");
    });

    it("applies size classes", () => {
      const node = Button({ size: "lg", children: "X" }) as HTMLButtonElement;
      expect(node.className).toContain("h-11");
    });

    it("applies iconOnly compound size", () => {
      const node = Button({
        iconOnly: true,
        size: "md",
        "aria-label": "Menu",
        children: "≡",
      }) as HTMLButtonElement;
      expect(node.className).toContain("size-10");
      expect(node.className).toContain("p-0");
    });

    it("applies fullWidth classes", () => {
      const node = Button({ fullWidth: true, children: "X" }) as HTMLButtonElement;
      expect(node.className).toContain("w-full");
    });

    it("local props override provider defaults", () => {
      const theme = createTheme({
        components: { button: { defaultVariants: { variant: "secondary" } } },
      });

      const node = UIProvider({
        theme,
        children: () => Button({ variant: "outline", children: "Go" }),
      }) as HTMLButtonElement;

      expect(node.className).toContain("border");
    });
  });

  describe("state", () => {
    it("disabled adds disabled attr for button", () => {
      const node = Button({ disabled: true, children: "X" }) as HTMLButtonElement;
      expect(node.disabled).toBe(true);
    });

    it("pending adds disabled, aria-busy, data-pending", () => {
      const node = Button({ pending: true, children: "…" }) as HTMLButtonElement;
      expect(node.disabled).toBe(true);
      expect(node.getAttribute("aria-busy")).toBe("true");
      expect(node.hasAttribute("data-pending")).toBe(true);
    });

    it("loading alias sets pending state", () => {
      const node = Button({ loading: true, children: "…" }) as HTMLButtonElement;
      expect(node.hasAttribute("data-pending")).toBe(true);
    });
  });

  describe("accessibility", () => {
    it("aria-disabled on disabled", () => {
      const node = Button({ disabled: true, children: "X" }) as HTMLButtonElement;
      expect(node.getAttribute("aria-disabled")).toBe("true");
    });

    it("focus-visible classes exist in styled mode", () => {
      const classes = buttonStyles({ variant: "primary" });
      expect(classes).toContain("focus-visible:ring-2");
    });

    it("headless preserves aria/data", () => {
      const node = Button({ headless: true, pending: true, children: "X" }) as HTMLButtonElement;
      expect(node.className).toBe("");
      expect(node.getAttribute("aria-busy")).toBe("true");
      expect(node.hasAttribute("data-pending")).toBe(true);
    });
  });

  describe("events", () => {
    it("onClick is called when enabled", () => {
      const onClick = vi.fn();
      const container = document.createElement("div");
      render(
        () =>
          Button({
            onClick,
            children: "Go",
          }),
        container,
      );
      container.querySelector("button")!.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("onClick is prevented when disabled", () => {
      const onClick = vi.fn();
      const node = Button({
        disabled: true,
        onClick,
        children: "Go",
      }) as HTMLButtonElement;
      node.click();
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("icons", () => {
    it("leftIcon renders", () => {
      const node = Button({ leftIcon: "★", children: "Save" }) as HTMLButtonElement;
      expect(node.querySelector("[data-btn-icon]")).not.toBeNull();
      expect(node.textContent).toContain("★");
    });

    it("rightIcon renders", () => {
      const node = Button({ rightIcon: "→", children: "Next" }) as HTMLButtonElement;
      expect(node.textContent).toContain("→");
    });

    it("spinner renders when pending", () => {
      const node = Button({ pending: true, children: "Wait" }) as HTMLButtonElement;
      expect(node.querySelector('[data-slot="spinner"]')).not.toBeNull();
      expect(node.textContent).toContain("Wait");
    });

    it("custom spinner renders", () => {
      const node = Button({ pending: true, spinner: "⟳", children: "Wait" }) as HTMLButtonElement;
      expect(node.textContent).toContain("⟳");
    });
  });

  describe("headless", () => {
    it("does not apply visual classes", () => {
      const node = Button({ headless: true, children: "X" }) as HTMLButtonElement;
      expect(node.className).toBe("");
    });

    it("still renders correct semantic attributes", () => {
      const node = Button({ headless: true, type: "submit", children: "X" }) as HTMLButtonElement;
      expect(node.getAttribute("type")).toBe("submit");
    });
  });

  describe("provider", () => {
    it("provider default variants apply", () => {
      const theme = createTheme({
        components: { button: { defaultVariants: { variant: "ghost" } } },
      });
      const node = UIProvider({
        theme,
        children: () => Button({ children: "Go" }),
      }) as HTMLButtonElement;
      expect(node.className).toContain("[--button-bg:transparent]");
    });

    it("provider className merges", () => {
      const theme = createTheme({
        components: { button: { className: "font-semibold" } },
      });
      const node = UIProvider({
        theme,
        children: () => Button({ children: "Go" }),
      }) as HTMLButtonElement;
      expect(node.className).toContain("font-semibold");
    });

    it("local class merges", () => {
      const node = Button({ className: "custom-class", children: "Go" }) as HTMLButtonElement;
      expect(node.className).toContain("custom-class");
      expect(node.className).toContain("inline-flex");
    });
  });
});
