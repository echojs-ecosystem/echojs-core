// @vitest-environment jsdom
import { describe, expect, it, afterEach } from "vitest";
import { createUIComponent } from "../core/component";
import { createTheme } from "../theme/create-theme";
import {
  createUIContextValue,
  getUIContext,
  resetUIContextStack,
  runWithUIContext,
} from "../theme/theme-context";
import { UIProvider } from "./UIProvider";
import { h } from "@echojs-ecosystem/hyperdom";

afterEach(() => {
  resetUIContextStack();
});

describe("UIProvider", () => {
  it("exposes theme in context for lazy children", () => {
    let prefix: string | undefined;

    UIProvider({
      theme: { prefix: "app" },
      children: () => {
        prefix = getUIContext()?.theme.prefix;
        return "ok";
      },
    });

    expect(prefix).toBe("app");
  });

  it("applies global headless mode to createUIComponent", () => {
    const Button = createUIComponent({
      name: "Button",
      defaultTag: "button",
      defaultProps: { className: "btn" },
      render: ({ className, headless }) => {
        return h("button", {
          className,
          "data-headless": headless ? "true" : "false",
        });
      },
    });

    const theme = createTheme({
      components: {
        button: { baseClass: "theme-base", className: "theme-extra" },
      },
    });

    const node = runWithUIContext(
      createUIContextValue({ theme, headless: true }),
      () => Button({ children: "Save" }),
    ) as HTMLButtonElement;

    expect(node.getAttribute("data-headless")).toBe("true");
    expect(node.className).toBe("");
  });

  it("supports component-local headless override", () => {
    const Button = createUIComponent({
      name: "Button",
      defaultTag: "button",
      defaultProps: { className: "btn" },
      render: ({ className, headless }) =>
        h("button", {
          className,
          "data-headless": headless ? "true" : "false",
        }),
    });

    const node = runWithUIContext(
      createUIContextValue({ headless: false }),
      () => Button({ headless: true, children: "Save" }),
    ) as HTMLButtonElement;

    expect(node.getAttribute("data-headless")).toBe("true");
    expect(node.className).toBe("");
  });

  it("merges provider defaultVariants into components", () => {
    const Button = createUIComponent({
      name: "Button",
      defaultTag: "button",
      variants: (options) => `variant-${options?.variant ?? "none"}`,
      render: ({ className }) => h("button", { className }),
    });

    const theme = createTheme({
      components: {
        button: {
          defaultVariants: { variant: "primary" },
        },
      },
    });

    const node = UIProvider({
      theme,
      children: () => Button({ children: "Go" }),
    }) as HTMLButtonElement;

    expect(node.className).toContain("variant-primary");
  });
});

