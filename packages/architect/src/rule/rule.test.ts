import { describe, expect, it } from "vitest";
import { rule } from "./rule";

describe("rule", () => {
  it("creates rule from name with defaults", () => {
    const result = rule("default/test");

    expect(result).toMatchObject({
      name: "default/test",
      severity: "error",
      descriptionUrl: undefined,
    });
    expect(result.check({} as never)).toEqual({ diagnostics: [] });
  });

  it("creates rule from options", async () => {
    const result = rule({
      name: "custom/rule",
      severity: "warn",
      descriptionUrl: "https://example.com",
      check: async () => ({
        diagnostics: [{ message: "oops", location: { path: "/a.ts" } }],
      }),
    });

    expect(result.severity).toBe("warn");
    expect(result.descriptionUrl).toBe("https://example.com");

    const checked = await result.check({} as never);
    expect(checked.diagnostics).toHaveLength(1);
  });
});
