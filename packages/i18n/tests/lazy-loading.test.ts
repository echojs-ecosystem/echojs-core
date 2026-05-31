import { describe, expect, it, vi } from "vitest";

import { createI18n } from "../src/create-i18n";

describe("lazy loading", () => {
  it("loads locale via importer", async () => {
    const loader = vi.fn(async () => ({
      common: { hello: "Hello" },
    }));

    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: { ready: "готово" },
        en: loader,
      },
    });

    await i18n.loadLocale("en");

    expect(loader).toHaveBeenCalledOnce();
    expect(i18n.t("common.hello")).toBe("Hello");
  });

  it("skips loading when locale is already eager", async () => {
    const loader = vi.fn(async () => ({ ok: "yes" }));

    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "ru",
      locales: {
        en: { ok: "loaded" },
        ru: loader,
      },
    });

    await i18n.loadLocale("en");
    expect(loader).not.toHaveBeenCalled();
  });

  it("tracks pending state during load", async () => {
    let resolveLoad: (() => void) | undefined;
    const loader = () =>
      new Promise<{ done: string }>((resolve) => {
        resolveLoad = () => resolve({ done: "ok" });
      });

    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "en",
      locales: { en: loader },
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
    const loader = vi.fn(async () => ({
      title: "English title",
    }));

    const i18n = createI18n({
      defaultLocale: "ru",
      fallbackLocale: "en",
      locales: {
        ru: { title: "Русский заголовок" },
        en: loader,
      },
    });

    await i18n.setLocale("en");

    expect(loader).toHaveBeenCalledOnce();
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

describe("dynamic messages", () => {
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
