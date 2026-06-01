import { describe, expect, it } from "vitest";
import { createFieldArray } from "./fieldArray";

describe("createFieldArray()", () => {
  it("move: from === to не меняет массив", () => {
    const a = createFieldArray([1, 2, 3]);
    a.move(1, 1);
    expect(a.$items.value()).toEqual([1, 2, 3]);
  });

  it("move: отрицательные индексы игнорируются", () => {
    const a = createFieldArray([1, 2]);
    a.move(-1, 0);
    expect(a.$items.value()).toEqual([1, 2]);
  });

  it("move: за пределами длины не меняет", () => {
    const a = createFieldArray([1, 2]);
    a.move(0, 5);
    expect(a.$items.value()).toEqual([1, 2]);
  });

  it("move: переставляет элементы", () => {
    const a = createFieldArray([1, 2, 3]);
    a.move(0, 2);
    expect(a.$items.value()).toEqual([2, 3, 1]);
  });

  it("updateAt обновляет по индексу", () => {
    const a = createFieldArray([{ n: 1 }, { n: 2 }]);
    a.updateAt(0, (row) => ({ ...row, n: 9 }));
    expect(a.$items.value()[0]!.n).toBe(9);
    expect(a.$items.value()[1]!.n).toBe(2);
  });

  it("replace и reset", () => {
    const a = createFieldArray([1, 2]);
    a.replace([9]);
    expect(a.$items.value()).toEqual([9]);
    a.reset();
    expect(a.$items.value()).toEqual([1, 2]);
  });

  it("prepend", () => {
    const a = createFieldArray([2]);
    a.prepend(1);
    expect(a.$items.value()).toEqual([1, 2]);
  });
});
