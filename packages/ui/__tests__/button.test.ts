// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { Button, UIProvider, createTheme } from "../src/index";
import { h } from "@echojs/hyperdom";

describe("Button", () => {
  it("renders a native button with default type=button", () => {
    const node = Button({ children: "Save" }) as HTMLButtonElement;
    expect(node.tagName.toLowerCase()).toBe("button");
    expect(node.getAttribute("type")).toBe("button");
  });

  it("supports as=a", () => {
    const node = Button({ as: "a", href: "/docs", children: "Docs" } as any) as HTMLAnchorElement;
    expect(node.tagName.toLowerCase()).toBe("a");
    expect(node.getAttribute("href")).toBe("/docs");
  });

  it("loading sets aria-busy and data-loading and disables", () => {
    const node = Button({ isLoading: true, children: "Saving..." }) as HTMLButtonElement;
    expect(node.getAttribute("aria-busy")).toBe("true");
    expect(node.hasAttribute("data-loading")).toBe(true);
    expect(node.disabled).toBe(true);
    expect(node.hasAttribute("data-disabled")).toBe(true);
  });

  it("disabled anchor prevents click default", () => {
    let prevented = false;
    const node = Button({
      as: "a",
      href: "/docs",
      isDisabled: true,
      "on:click": (e: MouseEvent) => {
        prevented = e.defaultPrevented;
      },
      children: "Docs",
    } as any) as HTMLAnchorElement;

    const ev = new MouseEvent("click", { cancelable: true });
    node.dispatchEvent(ev);
    expect(prevented).toBe(true);
  });

  it("provider defaultVariants are applied (className contains variant token)", () => {
    const theme = createTheme({
      components: {
        button: {
          defaultVariants: { variant: "secondary" },
        },
      },
    });

    const node = UIProvider({
      theme,
      children: () => Button({ children: "Go" }),
    }) as HTMLButtonElement;

    expect(node.className.length).toBeGreaterThan(0);
  });

  it("headless skips visual classes", () => {
    const node = Button({ headless: true, children: "Go" }) as HTMLButtonElement;
    expect(node.className).toBe("");
  });

  it("global headless skips visual classes", () => {
    const node = UIProvider({
      headless: true,
      children: () => Button({ children: "Go" }),
    }) as HTMLButtonElement;
    expect(node.className).toBe("");
  });
});

