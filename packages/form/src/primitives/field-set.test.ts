import { describe, expect, it, vi } from "vitest";

import { createField } from "./field";
import { createFieldSet } from "./field-set";

describe("createFieldSet", () => {
  it("validate collects errors from child validate()", () => {
    const email = {
      validate: vi.fn(() => ["required"]),
      reset: vi.fn(),
    };
    const set = createFieldSet({ email });

    expect(set.validate()).toEqual({ email: ["required"] });
    expect(email.validate).toHaveBeenCalledTimes(1);
  });

  it("reset calls reset on child fields", () => {
    const title = createField("initial");
    const set = createFieldSet({ title });

    title.set("changed");
    set.reset();
    expect(title.$value.value()).toBe("initial");
  });
});
