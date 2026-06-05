import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { rule } from "../../rule/rule";
import { formatPretty } from "./index";
import type { AugmentedDiagnostic } from "./types";

describe("formatPretty", () => {
  it("reports success when no diagnostics", () => {
    expect(formatPretty([], "/tmp")).toContain("No problems found");
  });

  it("includes error and warning counts", () => {
    const cwd = join("/", "project");
    const diagnostics: AugmentedDiagnostic[] = [
      {
        rule: rule({ name: "layer-imports", severity: "error" }),
        message: "forbidden import",
        location: { path: join(cwd, "src", "features", "a.ts") },
      },
      {
        rule: rule({ name: "public-api", severity: "warn" }),
        message: "deep import",
        location: { path: join(cwd, "src", "features", "b.ts") },
        fixes: [{ type: "create-folder", path: join(cwd, "fix") }],
      },
    ];

    const output = formatPretty(diagnostics, cwd);

    expect(output).toContain("1 error");
    expect(output).toContain("1 warning");
    expect(output).toContain("forbidden import");
    expect(output).toContain("layer-imports");
    expect(output).toContain("Auto-fixable");
  });
});
