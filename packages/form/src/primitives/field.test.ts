import { describe, expect, it } from "vitest";
import { createField } from "./field";

describe("createField()", () => {
  it("отмечает dirty при set", () => {
    const f = createField("");
    expect(f.$meta.value().dirty).toBe(false);
    f.set("x");
    expect(f.$meta.value().dirty).toBe(true);
  });

  it("validate всегда пустой (валидация на уровне формы)", async () => {
    const f = createField("");
    expect(f.validate()).toEqual([]);
    expect(await f.validateAsync()).toEqual([]);
  });

  it("bind: строка из DOM пишется в значение", () => {
    const f = createField("");
    const b = f.bind();
    b.onInputText({ currentTarget: { value: "hello" } } as never);
    expect(f.$value.value()).toBe("hello");
  });

  it("boolean: onChangeText читает checked", () => {
    const f = createField(false);
    const b = f.bind();
    b.onChangeText({ currentTarget: { checked: true } } as never);
    expect(f.$value.value()).toBe(true);
  });

  it("clearErrors очищает ошибки", () => {
    const f = createField("");
    f.$meta.update((m) => ({ ...m, errors: ["manual"] }));
    expect(f.$meta.value().errors).toEqual(["manual"]);
    f.clearErrors();
    expect(f.$meta.value().errors).toEqual([]);
  });

  it("bind() возвращает тот же singleton", () => {
    const f = createField("a");
    expect(f.bind()).toBe(f.bind());
  });

  it("value/meta/handlers — UI shortcuts для bindField", () => {
    const f = createField("hi");
    expect(f.value()).toBe("hi");
    expect(f.meta().dirty).toBe(false);
    expect(f.handlers).toBe(f.bind());

    f.set("bye");
    expect(f.value()).toBe("bye");
    expect(f.$value.value()).toBe("bye");
  });
});
