import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../h";
import { render } from "../render";

describe("children", () => {
  it("поддерживает Node children как есть", () => {
    const container = document.createElement("div");
    const child = document.createElement("span");
    child.textContent = "x";

    render(h("div", null, child), container);
    const root = container.firstElementChild as HTMLElement;
    expect(root.firstElementChild?.tagName.toLowerCase()).toBe("span");
    expect(root.textContent).toBe("x");
  });

  it("динамический child корректно заменяет только регион", async () => {
    const container = document.createElement("div");
    const s = signal(0);

    const view = h("div", null, [
      h("span", { id: "a" }, "A"),
      () => (s.value() === 0 ? "zero" : h("span", { id: "b" }, "one")),
      h("span", { id: "c" }, "C"),
    ]);

    render(view, container);
    const root = container.firstElementChild as HTMLElement;
    expect(root.querySelector("#a")?.textContent).toBe("A");
    expect(root.querySelector("#c")?.textContent).toBe("C");
    expect(root.textContent).toContain("zero");

    s.set(1);
    await Promise.resolve();
    expect(root.querySelector("#a")?.textContent).toBe("A");
    expect(root.querySelector("#b")?.textContent).toBe("one");
    expect(root.querySelector("#c")?.textContent).toBe("C");
  });
});
