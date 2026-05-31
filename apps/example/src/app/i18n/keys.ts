import type { TranslationKey } from "@echojs/i18n";

import type { AppMessages } from "./messages.js";

export type TKey = TranslationKey<AppMessages>;

export type ReactivityCardBase =
  | "reactivityLab.cards.signal"
  | "reactivityLab.cards.computed"
  | "reactivityLab.cards.batch"
  | "reactivityLab.cards.object"
  | "reactivityLab.cards.todos"
  | "reactivityLab.cards.peek"
  | "reactivityLab.cards.readonly"
  | "reactivityLab.cards.clock"
  | "reactivityLab.cards.cart"
  | "reactivityLab.cards.model";

export type QueryPlaygroundCardBase =
  | "queryDemo.cards.slow"
  | "queryDemo.cards.manual"
  | "queryDemo.cards.route"
  | "queryDemo.cards.cache"
  | "queryDemo.cards.infinite"
  | "queryDemo.cards.mutation";

export const cardTitleKey = (base: ReactivityCardBase | QueryPlaygroundCardBase): TKey =>
  `${base}.title` as TKey;

export const cardHintKey = (base: ReactivityCardBase | QueryPlaygroundCardBase): TKey =>
  `${base}.hint` as TKey;
