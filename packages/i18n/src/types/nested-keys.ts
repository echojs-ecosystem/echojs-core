import type { PluralMessages } from "../types";

type PluralShape = Partial<Record<"one" | "few" | "many" | "other", string>>;

type IsPluralLeaf<T> = T extends PluralShape
  ? keyof T extends keyof PluralMessages | undefined
    ? true
    : false
  : false;

/** Leaf values addressable by `t("a.b.c")`. */
type IsMessageLeaf<T> = T extends string ? true : IsPluralLeaf<T>;

/**
 * Dot-separated paths to translatable leaves in a nested message tree.
 *
 * @example
 * type Keys = TranslationKey<{ common: { save: string } }>; // "common.save"
 */
export type TranslationKey<T, Prefix extends string = ""> =
  IsMessageLeaf<T> extends true
    ? Prefix extends ""
      ? never
      : Prefix
    : T extends Record<string, unknown>
      ? {
          [K in keyof T & string]: TranslationKey<
            T[K],
            Prefix extends "" ? K : `${Prefix}.${K}`
          >;
        }[keyof T & string]
      : never;
