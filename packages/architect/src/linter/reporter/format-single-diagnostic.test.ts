import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { rule } from "../../rule/rule";
import { formatSingleDiagnostic } from "./format-single-diagnostic";

describe("formatSingleDiagnostic", () => {
  it("formats location, message and rule name", () => {
    const cwd = join("/", "project");
    const output = formatSingleDiagnostic(
      {
        rule: rule({
          name: "default/test",
          severity: "error",
          descriptionUrl: "https://example.com/rule",
        }),
        message: "something went wrong",
        location: {
          path: join(cwd, "src", "app.ts"),
          line: 10,
          column: 4,
        },
      },
      cwd,
    );

    expect(output).toContain("src/app.ts:10:4");
    expect(output).toContain("something went wrong");
    expect(output).toContain("default/test");
  });
});
