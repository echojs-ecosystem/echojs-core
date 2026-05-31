import { describe, expect, it } from "vitest";

import { createI18n } from "../create-i18n";
import { interpolate } from "./interpolation";

describe("interpolate", () => {
  it("keeps placeholder when param is missing", () => {
    expect(interpolate("Hi {name}", {})).toBe("Hi {name}");
    expect(interpolate("Hi {name}", undefined)).toBe("Hi {name}");
  });
});

describe("interpolation via createI18n", () => {
  it("interpolates a single param", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: { greeting: "Привет, {name}" },
        en: {},
      },
    });

    expect(i18n.t("greeting", { name: "Вова" })).toBe("Привет, Вова");
  });

  it("interpolates multiple params", () => {
    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "ru",
      locales: {
        en: { line: "{first} {last}" },
        ru: {},
      },
    });

    expect(i18n.t("line", { first: "John", last: "Doe" })).toBe("John Doe");
  });
});
