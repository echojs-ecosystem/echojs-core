import { describe, expect, it } from "vitest";
import { createField } from "./field";
import { createFieldArray } from "./fieldArray";
import { defineNestedFieldArrayOps } from "./nested-field-array-ops";

type Child = { id: ReturnType<typeof createField<number>> };
type Row = { name: ReturnType<typeof createField<string>>; kids: ReturnType<typeof createFieldArray<Child>> };

describe("defineNestedFieldArrayOps()", () => {
  it("append без аргумента вызывает newRow", () => {
    const arr = createFieldArray<Row>([]);
    const ops = defineNestedFieldArrayOps(arr, {
      newRow: () => ({
        name: createField(""),
        kids: createFieldArray<Child>([]),
      }),
    });
    ops.append();
    expect(arr.$items.value()).toHaveLength(1);
    expect(arr.$items.value()[0]!.name.$value.value()).toBe("");
  });

  it("remove/removeAt удаляют строку", () => {
    const arr = createFieldArray<Row>([
      { name: createField("a"), kids: createFieldArray<Child>([]) },
    ]);
    const ops = defineNestedFieldArrayOps(arr, {
      newRow: () => ({
        name: createField(""),
        kids: createFieldArray<Child>([]),
      }),
    });
    ops.remove(0);
    expect(arr.$items.value()).toHaveLength(0);
  });

  it("at() отдаёт вложенные ops по children", () => {
    const row: Row = {
      name: createField("n"),
      kids: createFieldArray<Child>([{ id: createField(1) }]),
    };
    const arr = createFieldArray<Row>([row]);
    const ops = defineNestedFieldArrayOps(arr, {
      newRow: () => ({
        name: createField(""),
        kids: createFieldArray<Child>([]),
      }),
      children: {
        kids: {
          newRow: (): Child => ({ id: createField(0) }),
        },
      },
    });
    const nested = ops.at(0)?.kids;
    expect(nested).toBeDefined();
    nested!.append();
    expect(row.kids.$items.value()).toHaveLength(2);
  });

  it("at() вне диапазона — undefined", () => {
    const arr = createFieldArray<Row>([]);
    const ops = defineNestedFieldArrayOps(arr, {
      newRow: () => ({
        name: createField(""),
        kids: createFieldArray<Child>([]),
      }),
      children: { kids: { newRow: (): Child => ({ id: createField(0) }) } },
    });
    expect(ops.at(0)).toBeUndefined();
  });
});
