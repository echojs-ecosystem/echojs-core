import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../src/h";
import { render } from "../src/render";
import { Show } from "../src/control/show";

describe("Show()", () => {
  it("рендерит children когда true", async () => {
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

    open.set(false);
    await Promise.resolve();
    expect(container.textContent).toBe("");
  });

  it("рендерит fallback когда false", async () => {
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
    expect(container.textContent).toBe("Closed");

    open.set(true);
    await Promise.resolve();
    expect(container.textContent).toBe("Open");
  });
});
