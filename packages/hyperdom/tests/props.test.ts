import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../src/h";
import { render } from "../src/render";

describe("props", () => {
  it("ставит class/className/id/title/data-*/aria-*", () => {
    const container = document.createElement("div");
    render(
      h("div", {
        class: "a",
        className: "b",
        id: "x",
        title: "t",
        "data-test": "1",
        "aria-label": "label",
      }),
      container,
    );

    const el = container.firstElementChild as HTMLElement;
    expect(el.id).toBe("x");
    expect(el.title).toBe("t");
    expect(el.getAttribute("class")).toBe("b"); // className wins (applied later)
    expect(el.getAttribute("data-test")).toBe("1");
    expect(el.getAttribute("aria-label")).toBe("label");
  });

  it("поддерживает style как string и object", () => {
    const container = document.createElement("div");
    render(h("div", { style: "color: red;" }), container);
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute("style")).toContain("color");

    const container2 = document.createElement("div");
    render(h("div", { style: { color: "blue", "background-color": "black" } }), container2);
    const el2 = container2.firstElementChild as HTMLElement;
    expect(el2.style.color).toBe("blue");
    expect(el2.style.backgroundColor).toBe("black");
  });

  it("поддерживает reactive props", async () => {
    const container = document.createElement("div");
    const name = signal("A");

    const view = h("input", { value: () => name.value() });
    render(view, container);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("A");

    name.set("B");
    await Promise.resolve();
    expect(input.value).toBe("B");
  });

  it("поддерживает ref", () => {
    const container = document.createElement("div");
    let seen: Element | null = null;
    const dispose = render(h("div", { ref: (el: Element | null) => (seen = el) }), container);

    expect(seen).toBe(container.firstElementChild);
    dispose();
    expect(seen).toBe(null);
  });
});

