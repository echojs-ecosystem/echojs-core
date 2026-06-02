import { describe, expect, it } from "vitest";
import { cn, resetClassNameMerger, setClassNameMerger } from "./cn";

describe("cn", () => {
  it("joins strings and ignores falsy values", () => {
    expect(cn("a", false && "b", undefined, null, "c")).toBe("a c");
  });

  it("flattens arrays", () => {
    expect(cn("a", ["b", "c"])).toBe("a b c");
  });

  it("supports conditional object maps", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("allows replacing the merger", () => {
    setClassNameMerger(() => "custom");
    expect(cn("a", "b")).toBe("custom");
    resetClassNameMerger();
    expect(cn("x", "y")).toBe("x y");
  });
});

