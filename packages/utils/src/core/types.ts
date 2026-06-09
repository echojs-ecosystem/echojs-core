import type { ReadonlySignal } from "@echojs-ecosystem/reactivity";

/** Base shape for utilities that register listeners, timers, or observers. */
export interface Disposable {
  dispose(): void;
}

export type UtilityResult = Disposable;

/** Value, getter, or reactive signal. */
export type MaybeSignalOrGetter<T> = T | ReadonlySignal<T> | (() => T);

/** DOM event target or resolver. */
export type EventTargetLike =
  | Window
  | Document
  | HTMLElement
  | EventTarget
  | null
  | undefined;

export type MaybeEventTarget =
  | EventTargetLike
  | ReadonlySignal<EventTargetLike>
  | (() => EventTargetLike);

export type ColorSchemePreference = "light" | "dark" | "auto";

export type MouseSourceType = "mouse" | "touch" | "pen" | null;
