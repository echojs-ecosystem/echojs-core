import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../../hyperscript/h";
import { render } from "../../render/render";
import { Show } from "./show";

const regionDisplay = (container: HTMLElement, index = 0): string =>
  (container.querySelectorAll("span")[index] as HTMLElement).style.display;

describe("Show()", () => {
  it("shows then branch and hides it with display:none when false", async () => {
    const container = document.createElement("div");
    const open = signal(true);

    render(
      Show(
        () => open.value(),
        () => h("div", null, "Open"),
      ),
      container,
    );

    expect(container.textContent).toBe("Open");
    expect(regionDisplay(container)).toBe("contents");

    open.set(false);
    await Promise.resolve();

    expect(container.textContent).toBe("Open");
    expect(regionDisplay(container)).toBe("none");
  });

  it("toggles then and fallback with display", async () => {
    const container = document.createElement("div");
    const open = signal(false);

    render(
      Show(
        () => open.value(),
        () => h("div", null, "Open"),
        () => h("div", null, "Closed"),
      ),
      container,
    );

    expect(container.textContent).toBe("OpenClosed");
    expect(regionDisplay(container, 0)).toBe("none");
    expect(regionDisplay(container, 1)).toBe("contents");

    open.set(true);
    await Promise.resolve();

    expect(regionDisplay(container, 0)).toBe("contents");
    expect(regionDisplay(container, 1)).toBe("none");
  });
});
