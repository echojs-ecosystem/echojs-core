import { describe, expect, it } from "vitest";

import { serializeTsObjectLiteral } from "./serialize-ts-literal";

describe("serializeTsObjectLiteral", () => {
  it("serializes nested objects and arrays", () => {
    expect(
      serializeTsObjectLiteral({
        keepPreviousData: true,
        staleTime: 60_000,
        retry: false,
        tags: ["users", "list"],
      }),
    ).toBe(
      [
        "{",
        "  keepPreviousData: true,",
        "  staleTime: 60000,",
        "  retry: false,",
        "  tags: [",
        '    "users",',
        '    "list",',
        "  ],",
        "}",
      ].join("\n"),
    );
  });

  it("returns empty string for empty object", () => {
    expect(serializeTsObjectLiteral({})).toBe("");
  });
});
