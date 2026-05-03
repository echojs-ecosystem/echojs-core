import { describe, expect, it } from "vitest";
import { z } from "zod";
import { createField } from "../src/primitives/field";

describe("createField()", () => {
  it("tracks dirty and validation errors", () => {
    const f = createField("", {
      validate: [(v) => (!v.trim() ? "required" : null)],
    });

    expect(f.$meta.value().dirty).toBe(false);
    expect(f.validate()).toEqual(["required"]);

    f.set("x");
    expect(f.$meta.value().dirty).toBe(true);
    expect(f.validate()).toEqual([]);
  });

  it("supports Standard Schema (Zod) validation", () => {
    const f = createField("", { schema: z.string().min(3) });
    expect(f.validate()).toEqual(["String must contain at least 3 character(s)"]);

    f.set("abc");
    expect(f.validate()).toEqual([]);
  });
});
