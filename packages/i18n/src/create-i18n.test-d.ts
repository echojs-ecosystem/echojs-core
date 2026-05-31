import { describe, expectTypeOf, it } from "vitest";

import { createI18n } from "./create-i18n";
import type {
  InferLocaleFromLocalesMap,
  InferMessagesFromLocalesMap,
  TranslationKey,
} from "./types";

const messages = {
  common: {
    save: "Save",
    greeting: "Hello",
  },
  items: {
    one: "1",
    other: "many",
  },
} as const;

describe("createI18n types", () => {
  it("infers locale ids from locales map", () => {
    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "ru",
      locales: {
        en: messages,
        ru: messages,
      },
    });

    type Locales = typeof i18n extends never
      ? never
      : InferLocaleFromLocalesMap<{ en: typeof messages; ru: typeof messages }>;

    expectTypeOf(i18n.supportedLocales).toEqualTypeOf<readonly ("en" | "ru")[]>();
    expectTypeOf(i18n.locale()).toEqualTypeOf<"en" | "ru">();
    expectTypeOf(i18n.setLocale).parameter(0).toEqualTypeOf<"en" | "ru">();
    expectTypeOf(i18n.loadLocale).parameter(0).toEqualTypeOf<"en" | "ru">();
    expectTypeOf<Locales>().toEqualTypeOf<"en" | "ru">();
  });

  it("infers translation keys from eager locale schema", () => {
    type Schema = InferMessagesFromLocalesMap<{ en: typeof messages; ru: typeof messages }>;
    type Keys = TranslationKey<Schema>;

    expectTypeOf<Keys>().toEqualTypeOf<
      "common.save" | "common.greeting" | "items"
    >();

    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "ru",
      locales: {
        en: messages,
        ru: messages,
      },
    });

    i18n.t("common.save");
    i18n.t("common.greeting", { name: "Echo" });
    i18n.t("items", { count: 2 });

    // @ts-expect-error unknown nested key
    i18n.t("common.unknown");
  });
});
