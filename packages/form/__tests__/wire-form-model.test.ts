import { describe, expect, it } from "vitest";
import { createField } from "../src/primitives/field";
import { createFieldArray } from "../src/primitives/fieldArray";
import { createFieldSet } from "../src/primitives/fieldSet";
import { wireFormModel } from "../src/wire/wire-form-model";

describe("wireFormModel()", () => {
  it("оборачивает Field в FieldAccessor", () => {
    const inner = createField("x");
    const wired = wireFormModel({ inner }).inner;
    expect(wired.value()).toBe("x");
    wired.set("y");
    expect(inner.$value.value()).toBe("y");
    expect(wired.handlers.onFocus).toBeDefined();
    expect(wired.validate()).toEqual([]);
  });

  it("FieldSet даёт { fields: { ... wired } }", () => {
    const fs = createFieldSet({ a: createField(1) });
    const wired = wireFormModel({ fs }).fs;
    expect(wired.fields.a.value()).toBe(1);
    wired.fields.a.set(2);
    expect(fs.fields.a.$value.value()).toBe(2);
  });

  it("FieldArray остаётся как есть", () => {
    const rows = createFieldArray([{ n: createField(0) }]);
    const wired = wireFormModel({ rows }).rows;
    expect(wired).toBe(rows);
  });

  it("рекурсивно обходит произвольный объект полей", () => {
    const tree = {
      box: {
        title: createField("t"),
      },
    };
    const wired = wireFormModel(tree).box.title;
    expect(wired.value()).toBe("t");
  });
});
