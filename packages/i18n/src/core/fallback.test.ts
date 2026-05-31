import { describe, expect, it } from "vitest";

import { createI18n } from "../create-i18n";

describe("fallback locale", () => {
  it("uses fallback locale when key is missing in primary locale", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: {},
        en: { common: { save: "Save" } },
      },
    });

    expect(i18n.t("common.save")).toBe("Save");
    expect(i18n.exists("common.save")).toBe(true);
  });

  it("returns key when missing everywhere by default", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: { ru: {}, en: {} },
    });

    expect(i18n.t("unknown.key")).toBe("unknown.key");
  });

  it("returns empty string when missingKeyStrategy is empty", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: { ru: {}, en: {} },
      missingKeyStrategy: "empty",
    });

    expect(i18n.t("unknown.key")).toBe("");
  });
});
