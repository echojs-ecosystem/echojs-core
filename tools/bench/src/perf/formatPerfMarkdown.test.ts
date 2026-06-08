import { describe, expect, test } from "vitest";
import { formatPerfMarkdown } from "./formatPerfMarkdown";

describe("formatPerfMarkdown", () => {
  test("renders a markdown table", () => {
    const md = formatPerfMarkdown({
      kind: "perf",
      generatedAt: "2026-01-01T00:00:00.000Z",
      node: "v20.0.0",
      root: "/repo",
      rows: [
        {
          group: "reactivity",
          name: "case",
          iterations: 10,
          totalMs: 5,
          meanMs: 0.5,
          opsPerSec: 2000,
        },
      ],
    });
    expect(md).toContain("## Perf");
    expect(md).toContain("| Group | Case |");
    expect(md).toContain("reactivity");
  });
});

