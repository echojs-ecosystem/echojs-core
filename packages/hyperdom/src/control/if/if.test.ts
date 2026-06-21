import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";

import { h } from "../../hyperscript/h";
import { render } from "../../render/render";
import { If } from "./if";

const visibleText = (container: HTMLElement): string => {
  const spans = container.querySelectorAll("span");
  return [...spans]
    .filter((el) => (el as HTMLElement).style.display === "contents")
    .map((el) => el.textContent ?? "")
    .join("");
};

describe("If(cond, render).IfElse().Else()", () => {
  it("renders the first matching branch", () => {
    const container = document.createElement("div");
    const state = signal<"idle" | "loading" | "error">("loading");

    render(
      If(() => state.value() === "idle", () => h("div", null, "Idle"))
        .IfElse(() => state.value() === "loading", () => h("div", null, "Loading"))
        .Else(() => h("div", null, "Error")),
      container,
    );

    expect(visibleText(container)).toBe("Loading");
    expect(container.textContent).toContain("Idle");
    expect(container.textContent).toContain("Error");
  });

  it("updates reactively when state changes", async () => {
    const container = document.createElement("div");
    const state = signal<"idle" | "loading">("idle");

    render(
      If(() => state.value() === "idle", () => h("div", null, "Idle"))
        .IfElse(() => state.value() === "loading", () => h("div", null, "Loading"))
        .Else(() => h("div", null, "Other")),
      container,
    );

    expect(visibleText(container)).toBe("Idle");

    state.set("loading");
    await Promise.resolve();
    expect(visibleText(container)).toBe("Loading");
  });

  it("uses Else when no branch matched", () => {
    const container = document.createElement("div");
    const state = signal<"a" | "b" | "c">("c");

    render(
      If(() => state.value() === "a", () => h("div", null, "A"))
        .IfElse(() => state.value() === "b", () => h("div", null, "B"))
        .Else(() => h("div", null, "Fallback")),
      container,
    );

    expect(visibleText(container)).toBe("Fallback");
  });

  it("supports arbitrary conditions", () => {
    const container = document.createElement("div");
    const count = signal(5);

    render(
      If(() => count.value() < 3, () => h("div", null, "Low")).Else(() =>
        h("div", null, "High"),
      ),
      container,
    );

    expect(visibleText(container)).toBe("High");
  });

  it("End() hides all branches when nothing matches", () => {
    const container = document.createElement("div");
    const state = signal<"a" | "b">("b");

    render(
      If(() => state.value() === "a", () => h("div", null, "A")).End(),
      container,
    );

    expect(visibleText(container)).toBe("");
  });
});
