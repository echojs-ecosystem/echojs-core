import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../hyperscript/h";
import { render } from "../render/render";
import { mount } from "../render/mount";

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

  it("поддерживает class как array/object (vue-like)", () => {
    const container = document.createElement("div");
    render(
      h("div", {
        class: ["a", { b: true, c: false }, ["d"]],
      }),
      container,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute("class")).toBe("a b d");
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

  it("поддерживает style как array (vue-like)", () => {
    const container = document.createElement("div");
    render(h("div", { style: [{ color: "red" }, { "background-color": "black" }] }), container);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.color).toBe("red");
    expect(el.style.backgroundColor).toBe("black");
  });

  it("поддерживает .prop и ^attr (vue-like)", () => {
    const container = document.createElement("div");
    render(
      h("div", null, [
        h("div", { ".innerHTML": "<span>ok</span>" }),
        h("input", { "^value": "x" }),
      ]),
      container,
    );

    const root = container.firstElementChild as HTMLDivElement;
    const divEl = root.firstElementChild as HTMLDivElement;
    expect(divEl.innerHTML).toBe("<span>ok</span>");

    const inputEl = root.querySelector("input") as HTMLInputElement;
    expect(inputEl.getAttribute("value")).toBe("x");
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

  it("cleanup вызывает ref(null) для узлов, созданных внутри динамического региона", async () => {
    const open = signal(true);
    let seen: Element | null = null;

    const { node, dispose } = mount(
      h("div", null, () => (open.value() ? h("span", { ref: (el) => (seen = el) }, "x") : null)),
    );

    expect(node.textContent).toBe("x");
    expect(seen).toBeInstanceOf(Element);

    open.set(false);
    await Promise.resolve();
    expect(node.textContent).toBe("");
    expect(seen).toBe(null);

    dispose();
  });
});
