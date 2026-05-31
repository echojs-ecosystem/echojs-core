import { interpolate } from "./interpolation";
import type { PluralMessages } from "../types";

const PLURAL_CATEGORIES = ["one", "few", "many", "other"] as const;

const isPluralMessages = (value: unknown): value is PluralMessages => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return PLURAL_CATEGORIES.some((category) => typeof record[category] === "string");
};

const pickPluralTemplate = (
  messages: PluralMessages,
  category: Intl.LDMLPluralRule,
): string | undefined => {
  const direct =
    category in messages
      ? messages[category as keyof PluralMessages]
      : undefined;
  if (typeof direct === "string") {
    return direct;
  }

  if (category !== "other" && typeof messages.other === "string") {
    return messages.other;
  }

  for (const fallbackCategory of PLURAL_CATEGORIES) {
    const template = messages[fallbackCategory];
    if (typeof template === "string") {
      return template;
    }
  }

  return undefined;
};

export const resolvePluralMessage = (
  value: unknown,
  locale: string,
  params: Record<string, unknown> | undefined,
): string | undefined => {
  if (!isPluralMessages(value)) {
    return undefined;
  }

  const count = params?.count;
  if (typeof count !== "number" || !Number.isFinite(count)) {
    return undefined;
  }

  const rules = new Intl.PluralRules(locale);
  const category = rules.select(count);
  const template = pickPluralTemplate(value, category);

  if (template === undefined) {
    return undefined;
  }

  return interpolate(template, { ...params, count });
};
