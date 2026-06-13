import { describe, expect, it } from "vitest";

import { parseAsArrayOf } from "../parsers/array";
import { parseAsInteger } from "../parsers/integer";
import { parseAsString } from "../parsers/string";
import { mergeSchemaSnapshot } from "./schema-snapshot";

describe("mergeSchemaSnapshot", () => {
  const schema = {
    q: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    tag: parseAsArrayOf(parseAsString).withDefault([]),
  };

  it("returns prev reference when all fields are equal", () => {
    const prev = { q: "bike", page: 2, tag: ["eu"] as string[] };
    const next = { q: "bike", page: 2, tag: ["eu"] };

    expect(mergeSchemaSnapshot(schema, prev, next)).toBe(prev);
  });

  it("preserves references for unchanged fields", () => {
    const tags = ["eu", "us"];
    const prev = { q: "bike", page: 2, tag: tags };
    const next = { q: "bikes", page: 2, tag: ["eu", "us"] };

    const merged = mergeSchemaSnapshot(schema, prev, next);
    expect(merged.q).toBe("bikes");
    expect(merged.page).toBe(2);
    expect(merged.page).toBe(prev.page);
    expect(merged.tag).toBe(tags);
  });

  it("uses parser.eq for array fields", () => {
    const prevTags = ["eu"];
    const prev = { q: "", page: 1, tag: prevTags };
    const next = { q: "", page: 1, tag: ["eu"] };

    expect(mergeSchemaSnapshot(schema, prev, next)).toBe(prev);
  });
});
