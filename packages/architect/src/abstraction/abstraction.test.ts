import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { abstraction } from "./abstraction";
import { rule } from "../rule/rule";

describe("abstraction", () => {
  it("creates abstraction from name shorthand", () => {
    expect(abstraction("shared")).toEqual({
      name: "shared",
      children: {},
      rules: [],
      fractal: undefined,
      fileTemplate: undefined,
    });
  });

  it("creates abstraction from config object", () => {
    const child = abstraction("entity");
    const customRule = rule("test/rule");

    const result = abstraction({
      name: "src",
      children: { entities: child },
      rules: [customRule],
      fractal: "src",
      fileTemplate: "export {}",
    });

    expect(result.name).toBe("src");
    expect(result.children.entities).toBe(child);
    expect(result.rules).toEqual([customRule]);
    expect(result.fractal).toBe("src");
    expect(result.fileTemplate?.(join("/", "any"))).toBe("export {}");
  });

  it("wraps string fileTemplate into function", () => {
    const result = abstraction({
      name: "module",
      fileTemplate: "export const ok = true",
    });

    expect(result.fileTemplate?.("/module/index.ts")).toBe(
      "export const ok = true",
    );
  });
});
