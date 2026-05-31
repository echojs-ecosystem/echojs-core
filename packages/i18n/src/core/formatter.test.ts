import { describe, expect, it } from "vitest";

import { createI18n } from "../create-i18n";
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatRelativeTime,
} from "./formatter";

describe("formatter", () => {
  it("formats numbers with locale", () => {
    const i18n = createI18n({
      defaultLocale: "en-US",
      fallbackLocale: "ru",
      locales: { "en-US": {}, ru: {} },
    });

    const formatted = i18n.number(123456.78);
    expect(formatted).toContain("123");
    expect(formatted).toContain("456");
  });

  it("formats currency", () => {
    const i18n = createI18n({
      defaultLocale: "en-US",
      fallbackLocale: "ru",
      locales: { "en-US": {}, ru: {} },
    });

    const formatted = i18n.currency(1000, "USD");
    expect(formatted).toMatch(/\$|USD/);
    expect(formatted).toContain("1");
  });

  it("formats dates", () => {
    const i18n = createI18n({
      defaultLocale: "en-US",
      fallbackLocale: "ru",
      locales: { "en-US": {}, ru: {} },
    });

    const formatted = i18n.date(new Date("2024-06-01T12:00:00.000Z"), {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });

    expect(formatted.length).toBeGreaterThan(0);
  });

  it("formats relative time", () => {
    const i18n = createI18n({
      defaultLocale: "en",
      fallbackLocale: "ru",
      locales: { en: {}, ru: {} },
    });

    expect(i18n.relativeTime(-1, "day")).toContain("day");
  });

  it("exposes pure format helpers", () => {
    expect(formatNumber("en-US", 1.5)).toBe("1.5");
    expect(formatCurrency("en-US", 10, "USD")).toMatch(/\$|USD/);
    expect(
      formatDate("en-US", new Date("2020-01-01T00:00:00.000Z"), {
        timeZone: "UTC",
        year: "numeric",
      }),
    ).toContain("2020");
    expect(formatRelativeTime("en", -1, "day")).toContain("day");
  });
});
