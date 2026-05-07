import { describe, expect, it } from "vitest";
import { createField } from "../src/primitives/field";
import { createFieldArray } from "../src/primitives/fieldArray";
import { createFieldSet } from "../src/primitives/fieldSet";
import { collectFormValueFromFields } from "../src/primitives/collect-form-value";

describe("collectFormValueFromFields()", () => {
  it("null проходит как null", () => {
    expect(collectFormValueFromFields(null)).toBeNull();
  });

  it("произвольный объект без полей формы сериализует значения", () => {
    expect(
      collectFormValueFromFields({
        x: 1,
        y: createField("z"),
      } as Record<string, unknown>),
    ).toEqual({ x: 1, y: "z" });
  });

  it("FieldArray с не-массивом $items даёт []", () => {
    const arr = createFieldArray([1]);
    const spy = { ...arr, $items: { value: () => null as unknown } };
    expect(collectFormValueFromFields(spy)).toEqual([]);
  });
});
