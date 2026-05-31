import type { Signal } from "@echojs/reactivity";

import type { TranslationKey } from "./types/nested-keys";

export type { TranslationKey } from "./types/nested-keys";

/** Nested message tree (string leaves and optional plural buckets). */
export type MessageSchema = Record<string, unknown>;

export type Messages = MessageSchema;

export type LocaleMessages = Record<string, Messages>;

export type MissingKeyStrategy = "key" | "empty";

export type LocaleModuleResult<T extends MessageSchema = MessageSchema> =
  | T
  | { default: T };

/** Dynamic import of a locale module (e.g. `() => import("./en.json")`). */
export type LocaleImporter<T extends MessageSchema = MessageSchema> = () => Promise<
  LocaleModuleResult<T>
>;

/** Eager messages object or lazy module import. */
export type LocaleSource<T extends MessageSchema = MessageSchema> =
  | T
  | LocaleImporter<T>;

export type LocalesMap<
  TLocale extends string,
  TMessages extends MessageSchema,
> = Record<TLocale, LocaleSource<TMessages>>;

export type CreateI18nOptions<
  TLocale extends string,
  TMessages extends MessageSchema,
> = {
  defaultLocale: TLocale;
  fallbackLocale: TLocale;
  locales: LocalesMap<TLocale, TMessages>;
  missingKeyStrategy?: MissingKeyStrategy;
};

export type I18n<
  TLocale extends string = string,
  TMessages extends MessageSchema = MessageSchema,
> = {
  /** Locale ids declared in `createI18n({ locales })`. */
  readonly supportedLocales: readonly TLocale[];

  locale(): TLocale;
  setLocale(locale: TLocale): Promise<void>;

  fallbackLocale(): TLocale;

  t(key: TranslationKey<TMessages>, params?: Record<string, unknown>): string;

  exists(key: TranslationKey<TMessages>): boolean;

  addMessages(locale: TLocale, messages: Partial<TMessages> | Messages): void;

  removeLocale(locale: TLocale): void;

  loadLocale(locale: TLocale): Promise<void>;

  number(value: number, options?: Intl.NumberFormatOptions): string;

  currency(
    value: number,
    currency: string,
    options?: Intl.NumberFormatOptions,
  ): string;

  date(value: Date, options?: Intl.DateTimeFormatOptions): string;

  relativeTime(
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
  ): string;

  readonly $locale: Signal<TLocale>;
  readonly $pending: Signal<boolean>;
  readonly $error: Signal<unknown | null>;
};

/** @deprecated Use `CreateI18nOptions` */
export type I18nOptions<
  TLocale extends string = string,
  TMessages extends MessageSchema = MessageSchema,
> = CreateI18nOptions<TLocale, TMessages>;

/** Plural message buckets keyed by Intl plural category. */
export type PluralMessages = Partial<
  Record<"one" | "few" | "many" | "other", string>
>;

/** @deprecated Use `LocaleImporter` */
export type LocaleLoader<T extends MessageSchema = MessageSchema> =
  LocaleImporter<T>;

/** @deprecated Use `LocaleModuleResult` */
export type LocaleLoaderResult<T extends MessageSchema = MessageSchema> =
  LocaleModuleResult<T>;

/** @deprecated Use `LocalesMap` */
export type LocaleLoaders<
  TLocale extends string = string,
  TMessages extends MessageSchema = MessageSchema,
> = LocalesMap<TLocale, TMessages>;
