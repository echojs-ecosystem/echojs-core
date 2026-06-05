import { describe, expect, it } from "vitest";
import { s } from "./pluralization";

describe("pluralization", () => {
  it("returns empty suffix for singular", () => {
    expect(s(1)).toBe("");
  });

  it("returns s for plural", () => {
    expect(s(0)).toBe("s");
    expect(s(2)).toBe("s");
  });
});
