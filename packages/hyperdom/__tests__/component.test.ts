import { describe, expect, it } from "vitest";
import { createComponent } from "../src/component";
import { createModel } from "../src/create-model";
import { createView } from "../src/create-view";
import { h } from "../src/h";

describe("createComponent()", () => {
  it("склеивает model и view в функцию-компонент", () => {
    const makeModel = createModel(() => ({ n: 1 }), "TestModel");
    const view = createView((vm: { n: number }) => h("div", null, String(vm.n)), "TestView");

    const Component = createComponent(makeModel, view);
    const node = Component() as HTMLElement;

    expect(node.tagName.toLowerCase()).toBe("div");
    expect(node.textContent).toBe("1");
  });
});
