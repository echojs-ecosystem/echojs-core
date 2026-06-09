import { describe, expect, it } from "vitest";

import { boolean as createBoolean } from "./boolean";

describe("boolean", () => {
  it("aliases toggle", () => {
    const bool = createBoolean(true);
    expect(bool.value()).toBe(true);
    bool.off();
    expect(bool.value()).toBe(false);
  });
});
