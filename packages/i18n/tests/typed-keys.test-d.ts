import { expectTypeOf } from "vitest";

import { createI18n } from "../src/create-i18n";
import type { TranslationKey } from "../src/types";

type AppMessages = {
  common: {
    save: string;
    greeting: string;
  };
  items: {
    one: string;
    other: string;
  };
};

const i18n = createI18n<"ru" | "en", AppMessages>({
  defaultLocale: "ru",
  fallbackLocale: "en",
  locales: {
    ru: {
      common: { save: "Сохранить", greeting: "Привет" },
      items: { one: "1", other: "many" },
    },
    en: {
      common: { save: "Save", greeting: "Hello" },
      items: { one: "1", other: "many" },
    },
  },
});

expectTypeOf(i18n.supportedLocales).toEqualTypeOf<readonly ("ru" | "en")[]>();
expectTypeOf(i18n.locale()).toEqualTypeOf<"ru" | "en">();

type Keys = TranslationKey<AppMessages>;
expectTypeOf<Keys>().toEqualTypeOf<
  "common.save" | "common.greeting" | "items"
>();

// @ts-expect-error unknown nested key
i18n.t("common.unknown");

i18n.t("common.save");
i18n.t("common.greeting", { name: "Echo" });
i18n.t("items", { count: 2 });
