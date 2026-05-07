import { describe, expect, it } from "vitest";
import { createField } from "../src/primitives/field";
import { createFieldArray } from "../src/primitives/fieldArray";
import { createFieldSet } from "../src/primitives/fieldSet";
import { deepReset, deepValidateAsync, deepValidateSync } from "../src/primitives/validation-tree";

describe("deepValidateSync()", () => {
  it("у Field без своих правил validate возвращает []", () => {
    const f = createField("");
    expect(deepValidateSync(f)).toEqual([]);
  });

  it("обходит FieldSet и массив", () => {
    const tree = createFieldSet({
      rows: createFieldArray([{ v: createField("") }]),
    });
    const out = deepValidateSync(tree) as Record<string, unknown>;
    expect(out.rows).toEqual([{ v: [] }]);
  });
});

describe("deepValidateAsync()", () => {
  it("у Field вызывает validateAsync", async () => {
    const f = createField("");
    expect(await deepValidateAsync(f)).toEqual([]);
  });

  it("узел только с validate() без validateAsync использует sync", async () => {
    const stub = { validate: () => ["e"] };
    expect(await deepValidateAsync(stub)).toEqual(["e"]);
  });
});

describe("deepReset()", () => {
  it("сбрасывает Field и вложенное дерево", () => {
    const f = createField("a");
    const tree = { f, arr: createFieldArray([1, 2]) };
    f.set("b");
    tree.arr.append(3);
    deepReset(tree);
    expect(f.$value.value()).toBe("a");
    expect(tree.arr.$items.value()).toEqual([1, 2]);
  });
});
