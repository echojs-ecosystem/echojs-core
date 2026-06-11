import { describe, expectTypeOf, it } from "vitest";
import { withMemoryStorage } from "@echojs-ecosystem/persist";

import { createField } from "./field";
import { createFieldArray } from "./field-array";
describe("field.extend() typing", () => {
  it("preserves Field core after persist extension", () => {
    const email = createField("").extend(withMemoryStorage({ key: "form:email" }));

    expectTypeOf(email.set).parameter(0).toEqualTypeOf<string>();
    expectTypeOf(email.$value.value()).toEqualTypeOf<string>();
    expectTypeOf(email.persist.hydrate).toBeFunction();
  });

  it("preserves FieldArray core after persist extension", () => {
    const phones = createFieldArray<string>([]).extend(
      withMemoryStorage({ key: "form:phones" }),
    );

    expectTypeOf(phones.append).parameter(0).toEqualTypeOf<string>();
    expectTypeOf(phones.append).toBeFunction();
    expectTypeOf(phones.replace).toBeFunction();
    expectTypeOf(phones.persist.save).toBeFunction();
  });

  it("extended fields keep UI helpers for bindings", () => {
    const name = createField("").extend(withMemoryStorage({ key: "form:name" }));
    const phones = createFieldArray<string>([]).extend(withMemoryStorage({ key: "form:phones" }));

    expectTypeOf(name.meta).toBeFunction();
    expectTypeOf(name.value).toBeFunction();
    expectTypeOf(name.set).toBeFunction();
    expectTypeOf(phones.$items).toBeObject();
    expectTypeOf(phones.append).toBeFunction();
  });
});
