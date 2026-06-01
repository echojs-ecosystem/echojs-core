import { describe, expect, it } from "vitest";
import { flattenFieldErrors } from "./flatten";

describe("flattenFieldErrors()", () => {
  it("склеивает путь через точку", () => {
    expect(
      flattenFieldErrors([
        { message: "a", path: ["user", "email"] },
        { message: "b", path: ["user", "email"] },
      ]),
    ).toEqual({
      "user.email": ["a", "b"],
    });
  });

  it("пустой путь → $root", () => {
    expect(flattenFieldErrors([{ message: "root err" }])).toEqual({
      $root: ["root err"],
    });
  });

  it("символ в пути сериализуется", () => {
    const sym = Symbol("s");
    const r = flattenFieldErrors([{ message: "m", path: ["a", sym] }]);
    expect(Object.keys(r)[0]).toContain("a.");
  });
});
