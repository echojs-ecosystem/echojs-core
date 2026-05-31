import { describe, expect, it } from "vitest";

import { createI18n } from "../src/create-i18n";

const ruItems = {
  one: "{count} товар",
  few: "{count} товара",
  many: "{count} товаров",
  other: "{count} товаров",
} as const;

describe("plural", () => {
  const i18n = createI18n({
    defaultLocale: "ru",
    fallbackLocale: "en",
    locales: {
      ru: { items: ruItems },
      en: {},
    },
  });

  it("selects one", () => {
    expect(i18n.t("items", { count: 1 })).toBe("1 товар");
  });

  it("selects few", () => {
    expect(i18n.t("items", { count: 3 })).toBe("3 товара");
  });

  it("selects many", () => {
    expect(i18n.t("items", { count: 5 })).toBe("5 товаров");
  });

  it("falls back to other for english-like locales", () => {
    const en = createI18n({
      defaultLocale: "en",
      fallbackLocale: "ru",
      locales: {
        en: {
          items: {
            one: "{count} item",
            other: "{count} items",
          },
        },
        ru: {},
      },
    });

    expect(en.t("items", { count: 1 })).toBe("1 item");
    expect(en.t("items", { count: 5 })).toBe("5 items");
  });
});
