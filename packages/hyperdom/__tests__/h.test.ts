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

  it("поддерживает форму h(tag, 'text') (props опущены)", () => {
    const el = h("div", "hello") as HTMLElement;
    expect(el.textContent).toBe("hello");
  });

  it("поддерживает форму h(tag, [children]) (props опущены)", () => {
    const el = h("div", ["a", h("span", "b")]) as HTMLElement;
    expect(el.textContent).toBe("ab");
    expect(el.childNodes.length).toBe(2);
  });

  it("поддерживает передачу children через 3+ аргумента (rest)", () => {
    const el = h("div", null, "a", "b", h("span", "c")) as HTMLElement;
    expect(el.textContent).toBe("abc");
    expect(el.childNodes.length).toBe(3);
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

  it("не путает Node с props (второй аргумент = Node → children)", () => {
    const child = document.createElement("span");
    child.textContent = "x";

    const el = h("div", child) as HTMLElement;
    expect(el.textContent).toBe("x");
    expect(el.firstElementChild).toBe(child);
  });

  it("поддерживает props без children", () => {
    const el = h("div", { id: "foo", class: "bar" }) as HTMLElement;
    expect(el.id).toBe("foo");
    expect(el.getAttribute("class")).toBe("bar");
    expect(el.childNodes.length).toBe(0);
  });

  it("поддерживает компонентные теги и пробрасывает children в props", () => {
    const Comp = (props: { prefix: string; children?: any }) =>
      h("div", null, [props.prefix, ":", props.children]);

    const node = h(Comp, { prefix: "p" }, "x") as HTMLElement;
    expect(node.tagName.toLowerCase()).toBe("div");
    expect(node.textContent).toBe("p:x");
  });

  it("поддерживает компонентные теги без children", () => {
    const Comp = (props: { n: number; children?: any }) => h("div", null, String(props.n));
    const node = h(Comp, { n: 1 }) as HTMLElement;
    expect(node.textContent).toBe("1");
  });

  it("создаёт svg-элемент по intrinsic tag", () => {
    const el = h("svg") as SVGElement;
    expect(el.tagName.toLowerCase()).toBe("svg");
  });
});
