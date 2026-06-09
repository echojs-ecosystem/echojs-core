/** Single source of truth for @echojs-ecosystem/utils docs navigation & generators. */

export type UtilsDocCategory = {
  id: string
  title: string
  utils: UtilsDocEntry[]
}

export type UtilsDocEntry = {
  /** URL slug — matches subpath export kebab-case */
  slug: string
  /** Export name */
  name: string
  description: string
  subpath: string
  /** Whether interactive :::util-demo is implemented */
  hasDemo?: boolean
}

export const utilsDocCategories: UtilsDocCategory[] = [
  {
    id: 'sensors',
    title: 'Sensors',
    utils: [
      { slug: 'window-size', name: 'windowSize', subpath: 'window-size', description: 'Track viewport width and height.' },
      { slug: 'media-query', name: 'mediaQuery', subpath: 'media-query', description: 'React to CSS media queries.' },
      { slug: 'breakpoints', name: 'breakpoints', subpath: 'breakpoints', description: 'Named responsive breakpoints.' },
      { slug: 'mouse', name: 'mouse', subpath: 'mouse', description: 'Pointer position on document.' },
      { slug: 'scroll', name: 'scroll', subpath: 'scroll', description: 'Scroll position and idle state.' },
      { slug: 'network', name: 'network', subpath: 'network', description: 'Network connection information.' },
      { slug: 'online', name: 'online', subpath: 'online', description: 'Navigator onLine status.' },
      { slug: 'idle', name: 'idle', subpath: 'idle', description: 'User idle detection.' },
      { slug: 'geolocation', name: 'geolocation', subpath: 'geolocation', description: 'Geolocation coordinates.' },
      { slug: 'hotkeys', name: 'hotkeys', subpath: 'hotkeys', description: 'Keyboard shortcut combos.' },
      { slug: 'key-press', name: 'keyPress', subpath: 'key-press', description: 'Single key pressed state.' },
      { slug: 'page-leave', name: 'pageLeave', subpath: 'page-leave', description: 'Pointer left the page.' },
    ],
  },
  {
    id: 'browser',
    title: 'Browser',
    utils: [
      { slug: 'active-element', name: 'activeElement', subpath: 'active-element', description: 'Track document.activeElement.', hasDemo: true },
      { slug: 'clipboard', name: 'clipboard', subpath: 'clipboard', description: 'Copy text to clipboard.' },
      { slug: 'document-title', name: 'documentTitle', subpath: 'document-title', description: 'Sync document.title.' },
      { slug: 'favicon', name: 'favicon', subpath: 'favicon', description: 'Update favicon link.' },
      { slug: 'color-scheme', name: 'colorScheme', subpath: 'color-scheme', description: 'Light / dark / auto theme.' },
      { slug: 'event-listener', name: 'eventListener', subpath: 'event-listener', description: 'Low-level event listener helper.' },
      { slug: 'document-visibility', name: 'documentVisibility', subpath: 'document-visibility', description: 'Tab visibility state.' },
      { slug: 'device-pixel-ratio', name: 'devicePixelRatio', subpath: 'device-pixel-ratio', description: 'devicePixelRatio signal.' },
      { slug: 'fullscreen', name: 'fullscreen', subpath: 'fullscreen', description: 'Fullscreen API wrapper.' },
      { slug: 'permission', name: 'permission', subpath: 'permission', description: 'Permissions API state.' },
      { slug: 'css-var', name: 'cssVar', subpath: 'css-var', description: 'CSS custom properties.' },
    ],
  },
  {
    id: 'timing',
    title: 'Timing',
    utils: [
      { slug: 'timeout', name: 'timeout', subpath: 'timeout', description: 'Delayed one-shot callback.' },
      { slug: 'interval', name: 'interval', subpath: 'interval', description: 'Repeating interval callback.' },
      { slug: 'debounce', name: 'debounce', subpath: 'debounce', description: 'Debounce a signal or function.' },
      { slug: 'throttle', name: 'throttle', subpath: 'throttle', description: 'Throttle a signal or function.' },
    ],
  },
  {
    id: 'state',
    title: 'State',
    utils: [
      { slug: 'toggle', name: 'toggle', subpath: 'toggle', description: 'Boolean on/off/toggle.' },
      { slug: 'counter', name: 'counter', subpath: 'counter', description: 'Numeric counter with clamp.' },
      { slug: 'boolean', name: 'boolean', subpath: 'boolean', description: 'Alias of toggle.' },
      { slug: 'previous', name: 'previous', subpath: 'previous', description: 'Previous signal value.' },
      { slug: 'local-storage', name: 'localStorage', subpath: 'local-storage', description: 'Persist value in localStorage.' },
      { slug: 'hash', name: 'hash', subpath: 'hash', description: 'Sync location.hash.' },
    ],
  },
  {
    id: 'dom',
    title: 'DOM',
    utils: [
      { slug: 'element-size', name: 'elementSize', subpath: 'element-size', description: 'Element width and height.' },
      { slug: 'resize-observer', name: 'resizeObserver', subpath: 'resize-observer', description: 'ResizeObserver callback.' },
      { slug: 'intersection-observer', name: 'intersectionObserver', subpath: 'intersection-observer', description: 'Intersection visibility.' },
      { slug: 'click-outside', name: 'clickOutside', subpath: 'click-outside', description: 'Pointer down outside target.' },
      { slug: 'hover', name: 'hover', subpath: 'hover', description: 'Pointer hover state.' },
      { slug: 'focus', name: 'focus', subpath: 'focus', description: 'Focus state and focus/blur.' },
    ],
  },
  {
    id: 'core',
    title: 'Core',
    utils: [
      { slug: 'is', name: 'is', subpath: 'is', description: 'Runtime type guards.' },
    ],
  },
]

export const allUtilsDocEntries = (): UtilsDocEntry[] =>
  utilsDocCategories.flatMap((c) => c.utils)

export const utilsDocEntryBySlug = (slug: string): UtilsDocEntry | undefined =>
  allUtilsDocEntries().find((u) => u.slug === slug)
