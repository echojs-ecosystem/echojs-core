import { signal } from "@echojs/reactivity";
import type { Signal } from "@echojs/reactivity";

export type LocaleState<TLocale extends string = string> = {
  readonly $locale: Signal<TLocale>;
  readonly $pending: Signal<boolean>;
  readonly $error: Signal<unknown | null>;
  readonly fallbackLocale: TLocale;
};

export const createLocaleState = <TLocale extends string>(
  initialLocale: TLocale,
  fallbackLocale: TLocale,
): LocaleState<TLocale> => ({
  $locale: signal(initialLocale),
  $pending: signal(false),
  $error: signal<unknown | null>(null),
  fallbackLocale,
});
