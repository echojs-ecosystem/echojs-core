import { describe, expect, it } from "vitest";
import {
  filterRootSchemaErrorsDeferredToFieldErrors,
  flattenValidationErrors,
} from "./flatten-validation";

describe("flattenValidationErrors()", () => {
  it("строка с пробелами не даёт ключ при пустом prefix", () => {
    expect(flattenValidationErrors("   ")).toEqual({});
  });

  it("строка с текстом под $root без prefix", () => {
    expect(flattenValidationErrors("err")).toEqual({ $root: ["err"] });
  });

  it("массив только строк — агрегирует под ключом", () => {
    expect(flattenValidationErrors(["a", "b"], "f")).toEqual({ f: ["a", "b"] });
  });

  it("вложенный объект с массивом по индексам", () => {
    const flat = flattenValidationErrors({
      tags: [{ name: "e1" }, { name: "e2" }],
    });
    expect(flat["tags.0.name"]).toEqual(["e1"]);
    expect(flat["tags.1.name"]).toEqual(["e2"]);
  });
});

describe("filterRootSchemaErrorsDeferredToFieldErrors()", () => {
  it("убирает ошибки схемы, перекрытые ошибками полей (точное совпадение пути)", () => {
    const fieldFlat = { email: ["bad"] };
    const schemaFlat = { email: ["schema"], other: ["keep"] };
    expect(filterRootSchemaErrorsDeferredToFieldErrors(fieldFlat, schemaFlat)).toEqual({
      other: ["keep"],
    });
  });

  it("блокирует по префиксу fk.startsWith(sk.)", () => {
    const fieldFlat = { "user.email": ["x"] };
    const schemaFlat = { user: ["schema"] };
    expect(filterRootSchemaErrorsDeferredToFieldErrors(fieldFlat, schemaFlat)).toEqual({});
  });

  it("блокирует по префиксу sk.startsWith(fk.)", () => {
    const fieldFlat = { user: ["x"] };
    const schemaFlat = { "user.email": ["schema"] };
    expect(filterRootSchemaErrorsDeferredToFieldErrors(fieldFlat, schemaFlat)).toEqual({});
  });
});
