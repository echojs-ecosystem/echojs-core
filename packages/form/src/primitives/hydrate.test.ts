import { describe, expect, it } from "vitest";
import { createField } from "./field";
import { createFieldArray } from "./field-array";
import { createFieldSet } from "./field-set";
import { hydrateFormFields } from "./hydrate";

describe("hydrateFormFields()", () => {
  it("записывает значение в Field", () => {
    const name = createField("");
    hydrateFormFields({ name }, { name: "Ada" });
    expect(name.$value.value()).toBe("Ada");
  });

  it("рекурсивно обходит FieldSet", () => {
    const profile = createFieldSet({
      email: createField(""),
    });
    hydrateFormFields({ profile } as unknown as Record<string, unknown>, {
      profile: { email: "e@e.com" },
    });
    expect(profile.fields.email.$value.value()).toBe("e@e.com");
  });

  it("укорачивает FieldArray при частичном значении", () => {
    const tags = createFieldArray([
      { t: createField("a") },
      { t: createField("b") },
      { t: createField("c") },
    ]);
    hydrateFormFields({ tags }, { tags: [{ t: "x" }] });
    expect(tags.$items.value()).toHaveLength(1);
    expect(tags.$items.value()[0]!.t.$value.value()).toBe("x");
  });

  it("удлиняет FieldArray через rowFactory", () => {
    const tags = createFieldArray([{ t: createField("a") }]);
    hydrateFormFields(
      { tags },
      { tags: [{ t: "1" }, { t: "2" }] },
      { tags: () => ({ t: createField("") }) },
    );
    expect(tags.$items.value()).toHaveLength(2);
    expect(tags.$items.value()[1]!.t.$value.value()).toBe("2");
  });

  it("игнорирует ключи, которых нет в дереве полей", () => {
    const a = createField("");
    hydrateFormFields({ a }, { a: "ok", missing: 1 } as Record<string, unknown>);
    expect(a.$value.value()).toBe("ok");
  });

  it("не падает на не-объекте partial", () => {
    const a = createField("");
    hydrateFormFields({ a }, null);
    expect(a.$value.value()).toBe("");
  });

  it("вложенный plain-object контейнер", () => {
    const inner = { x: createField(0) };
    hydrateFormFields({ inner } as Record<string, unknown>, { inner: { x: 7 } });
    expect(inner.x.$value.value()).toBe(7);
  });
});
