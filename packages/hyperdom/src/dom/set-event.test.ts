import { describe, expect, it, vi } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../h";
import { render } from "../render";
import { mount } from "../mount";

describe("setEvent", () => {
  it("навешивает onClick через addEventListener", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();
    render(h("button", { onClick }, "x"), container);

    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("игнорирует устаревший синтаксис on:click", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();
    render(h("button", { "on:click": onClick } as any, "x"), container);

    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("cleanup удаляет обработчики", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();
    const dispose = render(h("button", { onClick }, "x"), container);

    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);

    dispose();
    expect(container.childNodes.length).toBe(0);
  });

  it("cleanup удаляет listeners на живых узлах при обновлении динамического региона", async () => {
    const onClickA = vi.fn();
    const onClickB = vi.fn();

    const which = signal(0);
    const { node, dispose } = mount(
      h("div", null, () =>
        which.value() === 0
          ? h("button", { id: "a", onClick: onClickA }, "A")
          : h("button", { id: "b", onClick: onClickB }, "B"),
      ),
    );

    const a = node.querySelector("#a") as HTMLButtonElement;
    a.click();
    expect(onClickA).toHaveBeenCalledTimes(1);

    which.set(1);
    await Promise.resolve();

    const b = node.querySelector("#b") as HTMLButtonElement;
    b.click();
    expect(onClickB).toHaveBeenCalledTimes(1);

    dispose();
  });
});
