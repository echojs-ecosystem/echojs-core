import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../src/h";
import { render } from "../src/render";
import { List } from "../src/control/list";

describe("List()", () => {
  it("initial render", () => {
    const container = document.createElement("div");
    const items = signal(["A", "B", "C"]);

    render(List(items, (item) => h("div", { class: "item" }, item)), container);
    expect(container.querySelectorAll(".item").length).toBe(3);
    expect(container.textContent).toBe("ABC");
  });

  it("update (полный re-render списка на первом этапе)", async () => {
    const container = document.createElement("div");
    const items = signal(["A", "B"]);

    render(List(items, (item) => h("div", { class: "item" }, item)), container);
    expect(container.textContent).toBe("AB");

    items.set(["X"]);
    await Promise.resolve();
    expect(container.textContent).toBe("X");
    expect(container.querySelectorAll(".item").length).toBe(1);
  });
});

