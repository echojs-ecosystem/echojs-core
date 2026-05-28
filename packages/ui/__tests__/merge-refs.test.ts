import { describe, expect, it, vi } from "vitest";
import { mergeRefs } from "../src/utils/merge-refs";

describe("mergeRefs", () => {
  it("returns undefined when no refs are provided", () => {
    expect(mergeRefs()).toBeUndefined();
  });

  it("returns a single ref unchanged", () => {
    const ref = vi.fn();
    expect(mergeRefs(ref)).toBe(ref);
  });

  it("calls all refs with the instance", () => {
    const a = vi.fn();
    const b = vi.fn();
    const merged = mergeRefs(a, b)!;
    const node = document.createElement("div");

    merged(node);
    expect(a).toHaveBeenCalledWith(node);
    expect(b).toHaveBeenCalledWith(node);
  });
});

