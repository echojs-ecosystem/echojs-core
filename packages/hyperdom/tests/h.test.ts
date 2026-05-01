import { describe, expect, it } from "vitest";
import { h } from "../src/h";

describe("h()", () => {
  it("создаёт обычный элемент", () => {
    const el = h("div") as HTMLElement;
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.tagName.toLowerCase()).toBe("div");
  });

  it("поддерживает текстовые children", () => {
    const el = h("div", null, "hello") as HTMLElement;
    expect(el.textContent).toBe("hello");
  });

  it("flatten вложенные массивы children", () => {
    const el = h("div", null, ["a", ["b", ["c"]]]) as HTMLElement;
    expect(el.textContent).toBe("abc");
    expect(el.childNodes.length).toBe(3);
  });

  it("игнорирует null/undefined/boolean children", () => {
    const el = h("div", null, [null, undefined, false, true, "x"]) as HTMLElement;
    expect(el.textContent).toBe("x");
    expect(el.childNodes.length).toBe(1);
  });
});
