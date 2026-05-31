import { describe, expectTypeOf, it } from "vitest";
import { withMemoryStorage } from "@echojs/persist";
import type { Field, FieldArray } from "../src/types";
import { createField } from "../src/primitives/field";
import { createFieldArray } from "../src/primitives/fieldArray";
import { wireFormModel } from "../src/wire/wire-form-model";

describe("field.extend() typing", () => {
  it("preserves Field core after persist extension", () => {
    const email = createField("").extend(withMemoryStorage({ key: "form:email" }));

    expectTypeOf(email).toMatchObjectType<Field<string>>();
    expectTypeOf(email.set).toBeFunction();
    expectTypeOf(email.$value).toBeObject();
    expectTypeOf(email.persist.hydrate).toBeFunction();
  });

  it("preserves FieldArray core after persist extension", () => {
    const phones = createFieldArray<string>([]).extend(
      withMemoryStorage({ key: "form:phones" }),
    );

    expectTypeOf(phones).toMatchObjectType<FieldArray<string>>();
    expectTypeOf(phones.$items).toBeObject();
    expectTypeOf(phones.append).toBeFunction();
    expectTypeOf(phones.replace).toBeFunction();
    expectTypeOf(phones.persist.save).toBeFunction();
  });

  it("wireFormModel keeps accessors for extended fields", () => {
    const fields = {
      name: createField("").extend(withMemoryStorage({ key: "form:name" })),
      phones: createFieldArray<string>([]).extend(withMemoryStorage({ key: "form:phones" })),
    };

    const ui = wireFormModel(fields);

    expectTypeOf(ui.name.meta).toBeFunction();
    expectTypeOf(ui.name.set).toBeFunction();
    expectTypeOf(ui.phones.$items).toBeObject();
    expectTypeOf(ui.phones.append).toBeFunction();
  });
});
