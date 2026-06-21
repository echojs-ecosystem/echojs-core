import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";

import { createComponent } from "./create-component";
import { createModel } from "../model/create-model";
import { createView } from "../view/create-view";
import { h } from "../hyperscript/h";
import { render } from "../render/render";

describe("createComponent()", () => {
  it("склеивает model и view в функцию-компонент", () => {
    const makeModel = createModel(() => ({ n: 1 }), "TestModel");
    const view = createView((vm: { n: number }) => h("div", null, String(vm.n)), "TestView");

    const Component = createComponent(makeModel, view);
    const container = document.createElement("div");
    render(Component(), container);

    expect(container.querySelector("div")?.textContent).toBe("1");
  });

  it("принимает model factory с props: createModel(props)", () => {
    const makeModel = (props: { label: string }) =>
      createModel(() => ({ label: props.label }), "PropsModel");
    const view = createView((vm: { label: string }) => h("span", null, vm.label), "PropsView");

    const containerA = document.createElement("div");
    const containerB = document.createElement("div");
    render(createComponent(makeModel({ label: "a" }), view)(), containerA);
    render(createComponent(makeModel({ label: "b" }), view)(), containerB);

    expect(containerA.textContent).toBe("a");
    expect(containerB.textContent).toBe("b");
  });

  it("reuses the same model instance while mounted", async () => {
    let instances = 0;

    const makeModel = createModel(() => {
      instances += 1;
      const $value = signal(0);
      return {
        label: () => $value.value(),
        bump: () => $value.update((n) => n + 1),
      };
    }, "ReuseModel");

    const view = createView((vm: { label: () => number; bump: () => void }) =>
      h("button", { type: "button", onClick: vm.bump }, () => String(vm.label())),
    "ReuseView");

    const Component = createComponent(makeModel, view);
    const container = document.createElement("div");
    render(Component(), container);

    expect(instances).toBe(1);

    const button = container.querySelector("button")!;
    button.click();
    await Promise.resolve();

    expect(instances).toBe(1);
    expect(button.textContent).toBe("1");
  });
});
