// Core
export {
  createCleanupScope,
  tryOnCleanup,
} from "./core/cleanup";
export type { CleanupFn, CleanupScope } from "./core/cleanup";
export {
  defaultDocument,
  defaultNavigator,
  defaultWindow,
  isClient,
  isServer,
} from "./core/env";
export { eventListener } from "./core/event-listener";
export { toValue } from "./core/to-value";
export {
  hasOwn,
  isArray,
  isBigInt,
  isBoolean,
  isDate,
  isDefined,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isError,
  isFiniteNumber,
  isFunction,
  isInteger,
  isMap,
  isNaN,
  isNil,
  isNonEmptyArray,
  isNull,
  isNullable,
  isNullish,
  isNumber,
  isObject,
  isObjectLike,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isWeakMap,
  isWeakSet,
} from "./is";
export type {
  ColorSchemePreference,
  Disposable,
  EventTargetLike,
  MaybeEventTarget,
  MaybeSignalOrGetter,
  MouseSourceType,
  UtilityResult,
} from "./core/types";

// Sensors
export { breakpoints } from "./sensors/breakpoints";
export type { BreakpointsMap, BreakpointsOptions } from "./sensors/breakpoints";
export { geolocation } from "./sensors/geolocation";
export type { GeolocationOptions } from "./sensors/geolocation";
export { hotkeys } from "./sensors/hotkeys";
export type { HotkeysOptions } from "./sensors/hotkeys";
export { idle } from "./sensors/idle";
export type { IdleOptions } from "./sensors/idle";
export { keyPress } from "./sensors/key-press";
export type { KeyPressOptions } from "./sensors/key-press";
export { mediaQuery } from "./sensors/media-query";
export type { MediaQueryOptions } from "./sensors/media-query";
export { mouse } from "./sensors/mouse";
export type { MouseOptions } from "./sensors/mouse";
export { network } from "./sensors/network";
export { online } from "./sensors/online";
export { pageLeave } from "./sensors/page-leave";
export { scroll } from "./sensors/scroll";
export type { ScrollTarget, ScrollOptions } from "./sensors/scroll/scroll";
export { windowSize } from "./sensors/window-size";
export type { WindowSizeOptions } from "./sensors/window-size";

// Browser
export { activeElement } from "./browser/active-element";
export type { ActiveElementResult } from "./browser/active-element";
export { clipboard } from "./browser/clipboard";
export { colorScheme } from "./browser/color-scheme";
export { cssVar } from "./browser/css-var";
export { devicePixelRatio } from "./browser/device-pixel-ratio";
export type { DevicePixelRatioOptions } from "./browser/device-pixel-ratio";
export { documentTitle } from "./browser/document-title";
export { documentVisibility } from "./browser/document-visibility";
export type { DocumentVisibilityState } from "./browser/document-visibility";
export { favicon } from "./browser/favicon";
export { fullscreen } from "./browser/fullscreen";
export type { FullscreenTarget } from "./browser/fullscreen/fullscreen";
export { permission } from "./browser/permission";
export type { PermissionQueryState } from "./browser/permission";

// Timing
export { debounce, debounceFn } from "./timing/debounce";
export type { DebouncedFn } from "./timing/debounce";
export { interval } from "./timing/interval";
export { throttle, throttleFn } from "./timing/throttle";
export type { ThrottledFn } from "./timing/throttle";
export { timeout } from "./timing/timeout";

// State
export { boolean } from "./state/boolean";
export { counter } from "./state/counter";
export type { CounterOptions } from "./state/counter";
export { hash } from "./state/hash";
export { localStorage } from "./state/local-storage";
export type { LocalStorageOptions } from "./state/local-storage/local-storage";
export { previous } from "./state/previous";
export { toggle } from "./state/toggle";

// DOM
export { clickOutside } from "./dom/click-outside";
export type { ClickOutsideTarget } from "./dom/click-outside/click-outside";
export { elementSize } from "./dom/element-size";
export type { ElementTarget } from "./dom/element-size/element-size";
export { focus } from "./dom/focus";
export type { FocusTarget } from "./dom/focus/focus";
export { hover } from "./dom/hover";
export type { HoverTarget } from "./dom/hover/hover";
export { intersectionObserver } from "./dom/intersection-observer";
export type { IntersectionTarget } from "./dom/intersection-observer/intersection-observer";
export { resizeObserver } from "./dom/resize-observer";
export type { ResizeObserverTarget } from "./dom/resize-observer/resize-observer";
