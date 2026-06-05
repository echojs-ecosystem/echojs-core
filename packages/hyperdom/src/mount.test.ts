import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "./h";
import { mount } from "./mount";

describe("mount()", () => {
  it("создаёт контейнер, рендерит и даёт dispose", async () => {
    const s = signal(0);
    const { node, dispose } = mount(
      h("div", null, () => s.value()),
      { className: "x" },
    );

    expect(node.className).toBe("x");
    expect(node.textContent).toBe("0");

    s.set(1);
    await Promise.resolve();
    expect(node.textContent).toBe("1");

    dispose();
    expect(node.textContent).toBe("");
  });
});
