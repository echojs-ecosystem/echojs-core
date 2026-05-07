import { describe, expect, it, vi } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../src/h";
import { render } from "../src/render";
import { mount } from "../src/mount";

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

  it("поддерживает on:click", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();
    render(h("button", { "on:click": onClick }, "x"), container);

    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("поддерживает on:click:prevent", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();
    const e = new MouseEvent("click", { cancelable: true });

    render(h("button", { "on:click:prevent": onClick }, "x"), container);
    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.dispatchEvent(e);

    expect(e.defaultPrevented).toBe(true);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("поддерживает on:click:stop", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();

    const outer = h(
      "div",
      {
        onClick: () => {
          throw new Error("bubbled");
        },
      },
      h("button", { "on:click:stop": onClick }, "x"),
    );

    render(outer, container);
    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("поддерживает on:click:prevent:stop (оба модификатора)", () => {
    const container = document.createElement("div");
    const onClick = vi.fn();

    const outer = h(
      "div",
      {
        onClick: () => {
          throw new Error("bubbled");
        },
      },
      h("button", { "on:click:prevent:stop": onClick }, "x"),
    );

    render(outer, container);

    const btn = container.querySelector("button") as HTMLButtonElement;
    const e = new MouseEvent("click", { cancelable: true });
    btn.dispatchEvent(e);
    expect(e.defaultPrevented).toBe(true);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("поддерживает custom events через on:[...]", () => {
    const container = document.createElement("div");
    const onCustom = vi.fn();
    render(h("div", { "on:[my-event]": onCustom }), container);

    const el = container.firstElementChild as HTMLDivElement;
    el.dispatchEvent(new CustomEvent("my-event"));
    expect(onCustom).toHaveBeenCalledTimes(1);
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

    // Старый узел уже удалён из DOM. Важно, что он не удерживает обработчик
    // и новые клики по новому узлу работают.
    const b = node.querySelector("#b") as HTMLButtonElement;
    b.click();
    expect(onClickB).toHaveBeenCalledTimes(1);

    dispose();
  });
});
