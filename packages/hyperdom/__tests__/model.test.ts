import { describe, expect, it } from "vitest";
import { createModel, isInModelContext } from "../src/model";

describe("createModel()", () => {
  it("оборачивает фабрику модели в модельный контекст", () => {
    const make = createModel(() => {
      expect(isInModelContext()).toBe(true);
      return { ok: true };
    });

    expect(isInModelContext()).toBe(false);
    const vm = make();
    expect(vm.ok).toBe(true);
    expect(isInModelContext()).toBe(false);
  });
});
