import { describe, expectTypeOf, it } from "vitest";

import { createField } from "./field";
import { createForm } from "./create-form";

describe("createForm types", () => {
  it("infers fields shape from argument", () => {
    const title = createField("");
    const form = createForm({ title }, { name: "TypedForm" });

    expectTypeOf(form.fields.title).toEqualTypeOf<typeof title>();
    expectTypeOf(form.displayName).toEqualTypeOf<string>();
    expectTypeOf(form.submit).toBeFunction();
  });
});
