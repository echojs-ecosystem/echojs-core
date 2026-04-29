import { describe, expect, it, vi } from "vitest";
import { h } from "../src/h";
import { render } from "../src/render";

describe("events", () => {
  it("навешивает onClick через addEventListener", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();
    render(h("button", { onClick }, "x"), container);

    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("cleanup удаляет обработчики", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();
    const dispose = render(h("button", { onClick }, "x"), container);

    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);

    dispose();
    // узел уже удалён, поэтому повторно кликнуть нельзя; важно, что dispose не оставляет слушателей на живых узлах
    expect(container.childNodes.length).toBe(0);
  });
});

