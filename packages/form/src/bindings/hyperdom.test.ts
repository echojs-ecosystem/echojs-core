import { describe, expect, it } from "vitest";
import { bindField } from "./hyperdom";
import { createField } from "../primitives/field";

const inputEvt = (value: string) =>
  ({ currentTarget: { value } } as Event & { currentTarget: HTMLInputElement });

const checkboxEvt = (checked: boolean) =>
  ({
    currentTarget: { type: "checkbox", checked },
  } as Event & { currentTarget: HTMLInputElement });

const selectEvt = (value: string) =>
  ({ currentTarget: { value } }) as unknown as Event & { currentTarget: HTMLSelectElement };

describe("bindField()", () => {
  it("string: controlled value как функция", () => {
    const f = createField("hi");
    const c = bindField(f);
    expect(typeof c.value).toBe("function");
    expect(c.value()).toBe("hi");
    f.set("x");
    expect(c.value()).toBe("x");
  });

  it("string: onInput и onChange обновляют поле", () => {
    const f = createField("");
    const c = bindField(f);
    c.onInput(inputEvt("a"));
    expect(f.value()).toBe("a");
    c.onChange("b");
    expect(f.value()).toBe("b");
  });

  it("number: парсит DOM и показывает пустую строку для NaN", () => {
    const f = createField(Number.NaN);
    const c = bindField(f);
    expect(c.value()).toBe("");
    c.onChange(inputEvt("not-a-number"));
    expect(f.value()).toBe(0);
    c.onChange(7);
    expect(f.value()).toBe(7);
    expect(c.value()).toBe("7");
  });

  it("select: onChange обновляет значение", () => {
    const f = createField("a");
    const c = bindField(f);
    expect(c.value()).toBe("a");
    c.onChange(selectEvt("z"));
    expect(f.value()).toBe("z");
  });

  it("checkbox: checked отражает значение", () => {
    const f = createField(false);
    const c = bindField(f);
    expect(c.checked()).toBe(false);
    f.set(true);
    expect(c.checked()).toBe(true);
    c.onChange(checkboxEvt(false));
    expect(f.value()).toBe(false);
    c.onChange(true);
    expect(f.value()).toBe(true);
  });

  it("null/undefined отображаются как пустая строка", () => {
    const f = createField<string | null>(null);
    const c = bindField(f);
    expect(c.value()).toBe("");
  });

  it("error возвращает первую ошибку meta", () => {
    const f = createField("");
    f.$meta.set({ dirty: true, touched: true, focused: false, errors: ["Required"] });
    const c = bindField(f);
    expect(c.error()).toBe("Required");
  });

  it("onFocus / onBlur делегируют в handlers поля", () => {
    const f = createField("");
    const c = bindField(f);
    c.onFocus();
    expect(f.meta().focused).toBe(true);
    c.onBlur();
    expect(f.meta().focused).toBe(false);
    expect(f.meta().touched).toBe(true);
  });
});
