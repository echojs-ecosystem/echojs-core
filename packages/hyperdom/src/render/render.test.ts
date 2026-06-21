import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../hyperscript/h";
import { render } from "./render";

describe("render()", () => {
  it("очищает container перед вставкой", () => {
    const container = document.createElement("div");
    container.appendChild(document.createElement("span"));

    render(h("div", null, "ok"), container);
    expect(container.childNodes.length).toBe(1);
    expect(container.textContent).toBe("ok");
  });

  it("возвращает dispose и очищает DOM", () => {
    const container = document.createElement("div");
    const dispose = render(h("div", null, "ok"), container);
    expect(container.textContent).toBe("ok");

    dispose();
    expect(container.textContent).toBe("");
    expect(container.childNodes.length).toBe(0);
  });

  it("поддерживает реактивный text child", async () => {
    const container = document.createElement("div");
    const count = signal(0);

    const view = h("span", null, () => count.value());
    const dispose = render(view, container);
    expect(container.textContent).toBe("0");

    count.set(1);
    await Promise.resolve();
    expect(container.textContent).toBe("1");

    dispose();
    count.set(2);
    await Promise.resolve();
    expect(container.textContent).toBe("");
  });
});
