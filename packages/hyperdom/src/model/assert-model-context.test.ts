// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { assertModelContext } from "./assert-model-context";

describe("assertModelContext()", () => {
  it("throws with the API name in the message", () => {
    expect(() => assertModelContext("effect.mount")).toThrow(/effect\.mount\(\)/);
    expect(() => assertModelContext("watch")).toThrow(/createComponent/);
  });
});
