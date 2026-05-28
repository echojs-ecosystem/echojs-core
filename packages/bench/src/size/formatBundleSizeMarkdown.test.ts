import { describe, expect, test } from "vitest";
import { formatBundleSizeMarkdown } from "./formatBundleSizeMarkdown";

describe("formatBundleSizeMarkdown", () => {
  test("renders a markdown table", () => {
    const md = formatBundleSizeMarkdown({
      kind: "bundle-size",
      generatedAt: "2026-01-01T00:00:00.000Z",
      node: "v20.0.0",
      root: "/repo",
      rows: [
        {
          package: "core",
          entry: "packages/core/src/index.ts",
          bytes: 1000,
          gzipBytes: 500,
          brotliBytes: 400,
        },
      ],
    });
    expect(md).toContain("## Bundle size");
    expect(md).toContain("| Package | Entry |");
    expect(md).toContain("`core`");
  });
});

