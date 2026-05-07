import { describe, expect, it } from "vitest";
import { bindField } from "../src/bindings/hyperdom";
import { createField } from "../src/primitives/field";
import { wireFormModel } from "../src/wire/wire-form-model";

const inputEvt = (value: string) =>
  ({ currentTarget: { value } } as Event & { currentTarget: HTMLInputElement });

const selectEvt = (value: string) =>
  ({ currentTarget: { value } }) as unknown as Event & { currentTarget: HTMLSelectElement };

describe("bindField()", () => {
  it("text: без controlledValue не добавляет value", () => {
    const f = createField("hi");
    const c = bindField(f, { variant: "text" });
    expect("value" in c).toBe(false);
    expect(c.type).toBe("text");
  });

  it("text: controlledValue добавляет value как функцию", () => {
    const f = createField("hi");
    const c = bindField(f, { variant: "text", controlledValue: true });
    expect(typeof c.value).toBe("function");
    expect(c.value()).toBe("hi");
    f.set("x");
    expect(c.value()).toBe("x");
  });

  it("работает с FieldAccessor из wireFormModel", () => {
    const f = createField(2);
    const w = wireFormModel({ f }).f;
    const c = bindField(w, { variant: "number", controlledValue: true });
    c.onInput(inputEvt("5"));
    expect(w.value()).toBe(5);
    expect(c.value()).toBe("5");
  });

  it("select: controlledValue false не задаёт value", () => {
    const f = createField("a");
    const c = bindField(f, { variant: "select", controlledValue: false });
    expect("value" in c).toBe(false);
    c.onChange(selectEvt("z"));
    expect(f.$value.value()).toBe("z");
  });

  it("checkbox: checked отражает значение", () => {
    const f = createField(false);
    const c = bindField(f, { variant: "checkbox" });
    expect(c.checked()).toBe(false);
    f.set(true);
    expect(c.checked()).toBe(true);
  });

  it("number: парсит DOM и controlled показывает пустую строку для NaN", () => {
    const f = createField(Number.NaN);
    const c = bindField(f, { variant: "number", controlledValue: true });
    expect(c.value()).toBe("");
    c.onChange(inputEvt("not-a-number"));
    expect(f.$value.value()).toBe(0);
  });

  it("range: controlled для NaN даёт строку 0", () => {
    const f = createField(Number.NaN);
    const c = bindField(f, { variant: "range", controlledValue: true });
    expect(c.value()).toBe("0");
  });

  it("controlledStringValue: null/undefined как пустая строка", () => {
    const f = createField<string | null>(null);
    const c = bindField(f, { variant: "email", controlledValue: true });
    expect(c.value()).toBe("");
  });

  it("range: прокидывает min/max/step", () => {
    const f = createField(1);
    const c = bindField(f, {
      variant: "range",
      min: 0,
      max: 10,
      step: 2,
      controlledValue: false,
    });
    expect(c.min).toBe(0);
    expect(c.max).toBe(10);
    expect(c.step).toBe(2);
  });
});
