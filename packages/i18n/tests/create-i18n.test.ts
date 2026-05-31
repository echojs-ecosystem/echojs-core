import { computed } from "@echojs/reactivity";
import { describe, expect, it } from "vitest";

import { createI18n } from "../src/create-i18n";

describe("createI18n", () => {
  it("initializes defaultLocale from options", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: { hello: "Привет" },
        en: { hello: "Hello" },
      },
    });

    expect(i18n.locale()).toBe("ru");
    expect(i18n.$locale.value()).toBe("ru");
    expect(i18n.supportedLocales).toEqual(["ru", "en"]);
  });

  it("reacts to locale changes inside computed", async () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: { label: "Русский" },
        en: { label: "English" },
      },
    });

    const $label = computed(() => i18n.t("label"));

    expect($label.value()).toBe("Русский");

    await i18n.setLocale("en");
    expect($label.value()).toBe("English");
  });

  it("exposes fallback locale", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: {},
        en: {},
      },
    });

    expect(i18n.fallbackLocale()).toBe("en");
  });

  it("throws when defaultLocale is not in locales", () => {
    expect(() =>
      createI18n({
        defaultLocale: "de",
        fallbackLocale: "en",
        locales: { en: {} },
      }),
    ).toThrow(/defaultLocale/);
  });
});
