import { describe, expect, it } from "vitest";

import { createI18n } from "../create-i18n";

describe("translator", () => {
  const locales = {
    ru: {
      common: {
        save: "Сохранить",
        cancel: "Отмена",
      },
      auth: {
        login: {
          title: "Вход",
        },
      },
    },
    en: {
      common: {
        save: "Save",
        cancel: "Cancel",
      },
    },
  } as const;

  it("translates an existing key", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales,
    });

    expect(i18n.t("common.save")).toBe("Сохранить");
  });

  it("translates nested keys", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales,
    });

    expect(i18n.t("auth.login.title")).toBe("Вход");
  });

  it("reports key existence", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales,
    });

    expect(i18n.exists("common.save")).toBe(true);
    expect(i18n.exists("missing.key")).toBe(false);
  });
});
