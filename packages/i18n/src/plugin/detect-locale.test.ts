import { describe, expect, it } from "vitest";

import { detectLocale } from "./detect-locale";

describe("detectLocale", () => {
  it("returns fallback when storage and navigator miss", () => {
    expect(
      detectLocale({
        supported: ["en", "ru"],
        fallback: "en",
      }),
    ).toBe("en");
  });
});
