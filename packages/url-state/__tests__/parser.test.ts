import { describe, expect, it } from "vitest";
import { parseAsInteger, parseAsString } from "@echojs/url-state";

describe("parser builder", () => {
  it("withDefault: делает значение non-null и применяет default при отсутствии", () => {
    const p = parseAsInteger.withDefault(1);
    expect(p.parse(null)).toBeNull(); // низкоуровневый parser не подставляет default сам
    expect(p.defaultValue).toBe(1);
  });

  it("withOptions: сохраняет options на parser", () => {
    const p = parseAsString.withOptions({ history: "push", clearOnDefault: false });
    expect(p.options).toEqual({ history: "push", clearOnDefault: false });
  });
});

