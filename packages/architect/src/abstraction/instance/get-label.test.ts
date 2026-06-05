import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { abstraction } from "../abstraction";
import { getAbstractionInstanceLabel } from "./get-label";
import type { AbstractionInstance } from "./types";

describe("getAbstractionInstanceLabel", () => {
  it("returns folder name when it matches abstraction name", () => {
    const instance: AbstractionInstance = {
      path: join("/", "src", "shared"),
      abstraction: abstraction("shared"),
      children: [],
      childNodes: [],
    };

    expect(getAbstractionInstanceLabel(instance)).toBe("shared");
  });

  it("returns name with abstraction label when they differ", () => {
    const instance: AbstractionInstance = {
      path: join("/", "src", "features", "user"),
      abstraction: abstraction("feature"),
      children: [],
      childNodes: [],
    };

    expect(getAbstractionInstanceLabel(instance)).toBe("user (feature)");
  });
});
