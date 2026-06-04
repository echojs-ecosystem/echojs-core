import { createI18n } from "../create-i18n";
import type {
  AnyLocalesMap,
  CreateI18nOptions,
  I18n,
  InferLocaleFromLocalesMap,
  InferMessagesFromLocalesMap,
  Messages,
} from "../types";

/** Echo app provider with the active {@link I18n} instance. */
export type EchoI18nProvider<
  TLocale extends string = string,
  TMessages extends Messages = Messages,
> = {
  name: "i18n";
  readonly i18n: I18n<TLocale, TMessages>;
  setup: () => void | Promise<void>;
};

/**
 * Creates i18n and an Echo app provider (`setup` runs {@link I18n.start}).
 *
 * ```ts
 * export const i18nProvider = createI18nProvider({ locales: { en, ru } });
 * app.use(i18nProvider);
 * i18nProvider.i18n.t("key");
 * ```
 */
export function createI18nProvider<const TLocales extends AnyLocalesMap>(
  options: CreateI18nOptions<TLocales>,
): EchoI18nProvider<
  InferLocaleFromLocalesMap<TLocales>,
  InferMessagesFromLocalesMap<TLocales>
> {
  const i18n = createI18n(options);
  return {
    name: "i18n",
    i18n,
    setup: () => i18n.start(),
  };
}
