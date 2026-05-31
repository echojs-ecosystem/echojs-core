import { computed } from "@echojs/reactivity";
import { describe, expect, it, vi } from "vitest";

import { createI18n } from "./create-i18n";

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

describe("createI18n lazy loading", () => {
  it("loads locale via importer", async () => {
    const importer = vi.fn(async () => ({
      common: { hello: "Hello" },
    }));

    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: { ready: "готово" },
        en: importer,
      },
    });

    await i18n.loadLocale("en");

    expect(importer).toHaveBeenCalledOnce();
    expect(i18n.t("common.hello")).toBe("Hello");
  });

  it("skips loading when locale is already eager", async () => {
    const importer = vi.fn(async () => ({ ok: "yes" }));

    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "ru",
      locales: {
        en: { ok: "loaded" },
        ru: importer,
      },
    });

    await i18n.loadLocale("en");
    expect(importer).not.toHaveBeenCalled();
  });

  it("tracks pending state during load", async () => {
    let resolveLoad: (() => void) | undefined;
    const importer = () =>
      new Promise<{ done: string }>((resolve) => {
        resolveLoad = () => resolve({ done: "ok" });
      });

    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "en",
      locales: { en: importer },
    });

    const loadPromise = i18n.loadLocale("en");
    expect(i18n.$pending.value()).toBe(true);

    resolveLoad?.();
    await loadPromise;

    expect(i18n.$pending.value()).toBe(false);
    expect(i18n.t("done")).toBe("ok");
  });

  it("stores importer errors in $error", async () => {
    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "en",
      locales: {
        en: async () => {
          throw new Error("load failed");
        },
      },
    });

    await expect(i18n.loadLocale("en")).rejects.toThrow("load failed");
    expect(i18n.$error.value()).toEqual(new Error("load failed"));
  });

  it("loads locale on setLocale when needed", async () => {
    const importer = vi.fn(async () => ({
      title: "English title",
    }));

    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: { title: "Русский заголовок" },
        en: importer,
      },
    });

    await i18n.setLocale("en");

    expect(importer).toHaveBeenCalledOnce();
    expect(i18n.locale()).toBe("en");
    expect(i18n.t("title")).toBe("English title");
  });

  it("supports default export from dynamic import", async () => {
    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "en",
      locales: {
        en: async () => ({ default: { from: "module" } }),
      },
    });

    await i18n.loadLocale("en");
    expect(i18n.t("from")).toBe("module");
  });
});

describe("createI18n dynamic messages", () => {
  it("merges messages with addMessages", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: { common: { save: "Сохранить" } },
        en: {},
      },
    });

    i18n.addMessages("ru", {
      common: { hello: "Привет" },
    });

    expect(i18n.t("common.save")).toBe("Сохранить");
    expect(i18n.t("common.hello")).toBe("Привет");
  });

  it("deep merges nested objects", () => {
    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: {
          user: {
            profile: { name: "Имя" },
          },
        },
        en: {},
      },
    });

    i18n.addMessages("ru", {
      user: {
        profile: { edit: "Редактировать" },
      },
    });

    expect(i18n.t("user.profile.name")).toBe("Имя");
    expect(i18n.t("user.profile.edit")).toBe("Редактировать");
  });

  it("removes locale messages", () => {
    const i18n = createI18n({
      defaultLocale: "fr",
      fallbackLocale: "en",
      locales: {
        fr: { bye: "Au revoir" },
        en: { bye: "Goodbye" },
      },
    });

    expect(i18n.t("bye")).toBe("Au revoir");

    i18n.removeLocale("fr");
    expect(i18n.t("bye")).toBe("Goodbye");
  });
});
