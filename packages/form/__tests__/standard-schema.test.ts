import { describe, expect, it } from "vitest";
import {
  normalizeStandardSchemaIssues,
  normalizeStandardSchemaPathSegments,
  standardSchemaIssuesForUnknown,
  standardSchemaIssuesForUnknownSync,
} from "../src/validation/standard-schema";

describe("normalizeStandardSchemaPathSegments()", () => {
  it("нормализует сегмент с key как у Zod", () => {
    expect(normalizeStandardSchemaPathSegments([{ key: "nested" }] as unknown[])).toEqual(["nested"]);
  });

  it("числа и строки", () => {
    expect(normalizeStandardSchemaPathSegments(["a", 0])).toEqual(["a", "0"]);
  });
});

describe("normalizeStandardSchemaIssues()", () => {
  it("строка → одно issue", () => {
    expect(normalizeStandardSchemaIssues("msg")).toEqual([{ message: "msg" }]);
  });

  it("массив строк", () => {
    expect(normalizeStandardSchemaIssues(["a", "b"])).toEqual([{ message: "a" }, { message: "b" }]);
  });

  it("{ errors: [...] }", () => {
    expect(
      normalizeStandardSchemaIssues({
        errors: [{ message: "e", path: ["x"] }],
      }),
    ).toEqual([{ message: "e", path: ["x"] }]);
  });

  it("{ value } без issues — успех", () => {
    expect(normalizeStandardSchemaIssues({ value: 1 })).toEqual([]);
  });

  it("{ message } как последний fallback", () => {
    expect(normalizeStandardSchemaIssues({ message: "m" })).toEqual([{ message: "m" }]);
  });
});

describe("standardSchemaIssuesForUnknownSync()", () => {
  it("бросает если validate вернул Promise", () => {
    const schema = {
      "~standard": {
        version: 1 as const,
        vendor: "test",
        validate: () => Promise.resolve({ issues: [] as { message: string }[] }),
      },
    };
    expect(() => standardSchemaIssuesForUnknownSync(schema, null)).toThrow(/Promise/);
  });

  it("issues из результата validate", () => {
    const schema = {
      "~standard": {
        version: 1 as const,
        vendor: "test",
        validate: () => ({ issues: [{ message: "bad" }] }),
      },
    };
    const r = standardSchemaIssuesForUnknownSync(schema, 1);
    expect(r.ok).toBe(false);
    expect(r.issues[0]!.message).toBe("bad");
  });
});

describe("standardSchemaIssuesForUnknown()", () => {
  it("разворачивает Promise из validate", async () => {
    const schema = {
      "~standard": {
        version: 1 as const,
        vendor: "test",
        validate: () => Promise.resolve({ issues: [{ message: "async" }] }),
      },
    };
    const r = await standardSchemaIssuesForUnknown(schema, 1);
    expect(r.ok).toBe(false);
    expect(r.issues[0]!.message).toBe("async");
  });
});
