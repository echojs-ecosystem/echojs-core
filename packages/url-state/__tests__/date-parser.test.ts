import { describe, expect, it } from "vitest";
import { parseAsIsoDate } from "@echojs/url-state";

describe("parseAsIsoDate", () => {
  it("parse: valid ISO -> Date", () => {
    const d = parseAsIsoDate.parse("2020-01-01T00:00:00.000Z");
    expect(d).toBeInstanceOf(Date);
    expect(d?.toISOString()).toBe("2020-01-01T00:00:00.000Z");
  });

  it("parse: invalid -> null", () => {
    expect(parseAsIsoDate.parse("nope")).toBeNull();
  });

  it("serialize", () => {
    const d = new Date("2020-01-01T00:00:00.000Z");
    expect(parseAsIsoDate.serialize(d)).toBe("2020-01-01T00:00:00.000Z");
  });
});

