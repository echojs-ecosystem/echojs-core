import { describe, expect, it } from "vitest";
import { arrayGenerator, createField, createFieldArray, createForm } from "../src";

describe("arrayActions + arrayGenerator", () => {
  it("append/remove по вложенным FieldArray", () => {
    type Item = { label: ReturnType<typeof createField<string>> };

    const form = createForm(
      {
        items: createFieldArray<Item>([{ label: createField("a") }]),
      },
      {
        name: "ArrayActionsForm",
        arrayActions: (f) => {
          const createItem = (): Item => ({ label: createField("") });
          return {
            createItem,
            appendItem: arrayGenerator.append(f, createItem, "items"),
            removeItem: arrayGenerator.remove(f, "items"),
          };
        },
      },
    );

    expect(form.fields.items.$items.value()).toHaveLength(1);
    form.arrayActions.appendItem();
    expect(form.fields.items.$items.value()).toHaveLength(2);
    form.arrayActions.removeItem(1);
    expect(form.fields.items.$items.value()).toHaveLength(1);
  });
});
