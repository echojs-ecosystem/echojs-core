import { effect, signal } from "@echojs-ecosystem/reactivity";
import { createI18n } from "@echojs-ecosystem/i18n";
import { button, div, p } from "@echojs-ecosystem/hyperdom";
import type { PackagePlaygroundDef, PlaygroundInstance } from "../types.js";
import { pg } from "../playground-ui.js";

const en = {
  greeting: "Hello, {name}!",
  save: "Save",
} as const;

const ru = {
  greeting: "Привет, {name}!",
  save: "Сохранить",
} as const;

const create = (): PlaygroundInstance => {
  const i18n = createI18n({
    defaultLocale: "en",
    fallbackLocale: "en",
    locales: { en, ru },
  });

  const $snapshot = signal<Record<string, unknown>>({ locale: "en" });

  effect(() => {
    $snapshot.set({
      locale: i18n.locale(),
      greeting: i18n.t("greeting", { name: "EchoJS" }),
      save: i18n.t("save"),
    });
  });

  return {
    $snapshot,
    view: () =>
      div(null, [
        p({ class: pg.hint() }, "Switch locale — strings and $locale update together."),
        p({ class: pg.metric() }, () => i18n.t("greeting", { name: "Docs" })),
        p({ class: pg.row() }, () => i18n.t("save")),
        div({ class: pg.actions() }, [
          button(
            { class: pg.btn(), onClick: () => void i18n.setLocale("en") },
            "English",
          ),
          button(
            { class: pg.btnPrimary(), onClick: () => void i18n.setLocale("ru") },
            "Русский",
          ),
        ]),
      ]),
  };
};

export const i18nPlayground: PackagePlaygroundDef = {
  id: "i18n",
  title: "Translations",
  hint: "Isolated createI18n instance for this panel only.",
  available: true,
  create,
};
