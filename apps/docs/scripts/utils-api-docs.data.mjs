/** Doc content for @echojs-ecosystem/utils API pages. */

const sig = (s) => s.trim()

export const utilsApiDocs = [
  // ─── Sensors ─────────────────────────────────────────────
  {
    slug: 'window-size',
    name: 'windowSize',
    description: 'Reactive viewport width and height from `resize` events.',
    usage: sig(`
import { windowSize } from '@echojs-ecosystem/utils/window-size'

const size = windowSize({ initialWidth: 0, initialHeight: 0 })
size.width()
size.height()
size.dispose()
`),
    types: sig(`
export interface WindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  window?: Window
}

export const windowSize: (options?: WindowSizeOptions) => {
  width: () => number
  height: () => number
  $width: Signal<number>
  $height: Signal<number>
  dispose: () => void
}
`),
    params: [
      ['`options.initialWidth`', '`number`', '`0`', 'SSR / pre-hydration width'],
      ['`options.initialHeight`', '`number`', '`0`', 'SSR / pre-hydration height'],
      ['`options.window`', '`Window`', '`defaultWindow`', 'Custom window reference'],
    ],
    returns: [
      ['`width()`', '`number`', 'Current inner width'],
      ['`height()`', '`number`', 'Current inner height'],
      ['`$width`', '`Signal<number>`', 'Reactive width'],
      ['`$height`', '`Signal<number>`', 'Reactive height'],
      ['`dispose()`', '`void`', 'Remove `resize` listener'],
    ],
    ssr: 'No `resize` listener on the server — uses `initialWidth` / `initialHeight`.',
  },
  {
    slug: 'media-query',
    name: 'mediaQuery',
    description: 'Track whether a CSS media query currently matches.',
    usage: sig(`
import { mediaQuery } from '@echojs-ecosystem/utils/media-query'

const dark = mediaQuery('(prefers-color-scheme: dark)')
if (dark.matches()) { /* … */ }
dark.dispose()
`),
    types: sig(`
export interface MediaQueryOptions {
  window?: Window
}

export const mediaQuery: (
  query: string,
  options?: MediaQueryOptions,
) => {
  matches: () => boolean
  $matches: Signal<boolean>
  dispose: () => void
}
`),
    params: [
      ['`query`', '`string`', '—', 'Valid CSS media query string'],
      ['`options.window`', '`Window`', '`defaultWindow`', 'Window for `matchMedia`'],
    ],
    returns: [
      ['`matches()`', '`boolean`', 'Whether the query matches now'],
      ['`$matches`', '`Signal<boolean>`', 'Reactive match state'],
      ['`dispose()`', '`void`', 'Remove `change` listener'],
    ],
  },
  {
    slug: 'breakpoints',
    name: 'breakpoints',
    description: 'Map viewport width to named breakpoints.',
    usage: sig(`
import { breakpoints } from '@echojs-ecosystem/utils/breakpoints'

const bp = breakpoints({ sm: 640, md: 768, lg: 1024 })
bp.current()           // e.g. "md"
bp.greaterOrEqual('md')
bp.dispose()
`),
    types: sig(`
export type BreakpointsMap = Record<string, number>

export interface BreakpointsOptions {
  breakpoints?: BreakpointsMap
  window?: Window
}

export const breakpoints: (options?: BreakpointsOptions) => {
  current: () => string
  $current: ComputedSignal<string>
  greaterOrEqual: (name: string) => boolean
  smaller: (name: string) => boolean
  dispose: () => void
}
`),
    params: [
      ['`options.breakpoints`', '`BreakpointsMap`', 'sm/md/lg/… defaults', 'Name → min width in px'],
      ['`options.window`', '`Window`', '`defaultWindow`', 'Window for `innerWidth`'],
    ],
    returns: [
      ['`current()`', '`string`', 'Largest matching breakpoint name'],
      ['`greaterOrEqual(name)`', '`boolean`', '`innerWidth >= breakpoints[name]`'],
      ['`smaller(name)`', '`boolean`', '`innerWidth < breakpoints[name]`'],
      ['`dispose()`', '`void`', 'Remove `resize` listener'],
    ],
  },
  {
    slug: 'mouse',
    name: 'mouse',
    description: 'Track pointer position from `mousemove` and `touchmove`.',
    usage: sig(`
import { mouse } from '@echojs-ecosystem/utils/mouse'

const pointer = mouse()
pointer.x()
pointer.y()
pointer.sourceType() // 'mouse' | 'touch' | 'pen' | null
pointer.dispose()
`),
    types: sig(`
export interface MouseOptions {
  document?: Document
}

export const mouse: (options?: MouseOptions) => {
  x: () => number
  y: () => number
  sourceType: () => MouseSourceType
  $x: Signal<number>
  $y: Signal<number>
  $sourceType: Signal<MouseSourceType>
  dispose: () => void
}
`),
    params: [
      ['`options.document`', '`Document`', '`defaultDocument`', 'Document to listen on'],
    ],
    returns: [
      ['`x()`, `y()`', '`number`', '`clientX` / `clientY`'],
      ['`sourceType()`', '`MouseSourceType`', "mouse | touch | pen | null"],
      ['`dispose()`', '`void`', 'Remove move listeners'],
    ],
  },
  {
    slug: 'scroll',
    name: 'scroll',
    description: 'Scroll offset and short-lived `isScrolling` flag.',
    usage: sig(`
import { scroll } from '@echojs-ecosystem/utils/scroll'

const pos = scroll(window, { idleTimeout: 150 })
pos.x()
pos.y()
pos.isScrolling()
pos.dispose()
`),
    types: sig(`
export type ScrollTarget = Window | HTMLElement | Document | null | undefined

export interface ScrollOptions {
  idleTimeout?: number
}

export const scroll: (
  target?: MaybeSignalOrGetter<ScrollTarget>,
  options?: ScrollOptions,
) => {
  x: () => number
  y: () => number
  isScrolling: () => boolean
  $x: Signal<number>
  $y: Signal<number>
  $isScrolling: Signal<boolean>
  dispose: () => void
}
`),
    params: [
      ['`target`', '`MaybeSignalOrGetter<ScrollTarget>`', '`defaultWindow`', 'Scroll container'],
      ['`options.idleTimeout`', '`number`', '`150`', 'ms until `isScrolling` becomes false'],
    ],
    returns: [
      ['`x()`, `y()`', '`number`', 'Scroll offset'],
      ['`isScrolling()`', '`boolean`', '`true` while scrolling, then idle timeout'],
      ['`dispose()`', '`void`', 'Remove listener and idle timer'],
    ],
  },
  {
    slug: 'network',
    name: 'network',
    description: 'Online status and Network Information API metrics.',
    usage: sig(`
import { network } from '@echojs-ecosystem/utils/network'

const net = network()
net.online()
net.effectiveType()
net.dispose()
`),
    types: sig(`
export const network: () => {
  online: () => boolean
  effectiveType: () => string | undefined
  downlink: () => number | undefined
  rtt: () => number | undefined
  saveData: () => boolean | undefined
  $online: Signal<boolean>
  $effectiveType: Signal<string | undefined>
  $downlink: Signal<number | undefined>
  dispose: () => void
}
`),
    returns: [
      ['`online()`', '`boolean`', '`navigator.onLine`'],
      ['`effectiveType()`', '`string | undefined`', 'e.g. `4g`, `3g`'],
      ['`downlink()`', '`number | undefined`', 'Mbps estimate'],
      ['`rtt()`', '`number | undefined`', 'Round-trip time ms'],
      ['`saveData()`', '`boolean | undefined`', 'Data-saver mode'],
      ['`dispose()`', '`void`', 'Remove listeners'],
    ],
  },
  {
    slug: 'online',
    name: 'online',
    description: 'Simple `navigator.onLine` reactive wrapper.',
    usage: sig(`
import { online } from '@echojs-ecosystem/utils/online'

const connection = online()
connection.value()
connection.dispose()
`),
    types: sig(`
export const online: () => {
  value: () => boolean
  $value: Signal<boolean>
  dispose: () => void
}
`),
    returns: [
      ['`value()`', '`boolean`', 'Whether the browser is online'],
      ['`$value`', '`Signal<boolean>`', 'Reactive online state'],
      ['`dispose()`', '`void`', 'Remove `online` / `offline` listeners'],
    ],
  },
  {
    slug: 'idle',
    name: 'idle',
    description: 'Detect user inactivity after a timeout.',
    usage: sig(`
import { idle } from '@echojs-ecosystem/utils/idle'

const userIdle = idle({ timeout: 60_000 })
userIdle.idle()
userIdle.reset()
userIdle.dispose()
`),
    types: sig(`
export interface IdleOptions {
  timeout?: number
  initial?: boolean
}

export const idle: (options?: IdleOptions) => {
  idle: () => boolean
  active: () => boolean
  reset: () => void
  $idle: Signal<boolean>
  dispose: () => void
}
`),
    params: [
      ['`options.timeout`', '`number`', '`60000`', 'Idle threshold in ms'],
      ['`options.initial`', '`boolean`', '`false`', 'Initial idle flag'],
    ],
    returns: [
      ['`idle()`', '`boolean`', 'User is idle'],
      ['`active()`', '`boolean`', 'Inverse of `idle()`'],
      ['`reset()`', '`void`', 'Restart idle timer'],
      ['`dispose()`', '`void`', 'Remove activity listeners'],
    ],
  },
  {
    slug: 'geolocation',
    name: 'geolocation',
    description: 'Watch or refresh geolocation coordinates.',
    usage: sig(`
import { geolocation } from '@echojs-ecosystem/utils/geolocation'

const geo = geolocation({ immediate: true })
geo.coords()
geo.loading()
geo.refresh()
geo.stop()
geo.dispose()
`),
    types: sig(`
export interface GeolocationOptions extends PositionOptions {
  immediate?: boolean
}

export const geolocation: (options?: GeolocationOptions) => {
  coords: () => GeolocationCoordinates | null
  timestamp: () => number | null
  error: () => GeolocationPositionError | null
  loading: () => boolean
  $coords: Signal<GeolocationCoordinates | null>
  $error: Signal<GeolocationPositionError | null>
  $loading: Signal<boolean>
  start: () => void
  stop: () => void
  refresh: () => void
  dispose: () => void
}
`),
    params: [
      ['`immediate`', '`boolean`', '`true`', 'Start `watchPosition` on create'],
      ['`enableHighAccuracy`', '`boolean`', '—', 'Standard `PositionOptions`'],
      ['`timeout`', '`number`', '—', 'Standard `PositionOptions`'],
      ['`maximumAge`', '`number`', '—', 'Standard `PositionOptions`'],
    ],
    returns: [
      ['`coords()`', '`GeolocationCoordinates | null`', 'Latest coordinates'],
      ['`error()`', '`GeolocationPositionError | null`', 'Last error'],
      ['`loading()`', '`boolean`', 'Watch / refresh in progress'],
      ['`start()` / `stop()`', '`void`', 'Control `watchPosition`'],
      ['`refresh()`', '`void`', 'One-shot `getCurrentPosition`'],
      ['`dispose()`', '`void`', 'Clear watch'],
    ],
  },
  {
    slug: 'hotkeys',
    name: 'hotkeys',
    description: 'Listen for keyboard shortcut combos (`ctrl+s`, `meta+k`, …).',
    usage: sig(`
import { hotkeys } from '@echojs-ecosystem/utils/hotkeys'

const hk = hotkeys('ctrl+s', (e) => save(), { preventDefault: true })
hk.dispose()
`),
    types: sig(`
export interface HotkeysOptions {
  preventDefault?: boolean
  target?: Document | Window
}

export const hotkeys: (
  keys: string | string[],
  handler: (event: KeyboardEvent) => void,
  options?: HotkeysOptions,
) => { dispose: () => void }
`),
    params: [
      ['`keys`', '`string | string[]`', '—', 'Combo strings to match'],
      ['`handler`', '`(event) => void`', '—', 'Called on match'],
      ['`options.preventDefault`', '`boolean`', '`false`', 'Call `preventDefault` on match'],
      ['`options.target`', '`Document | Window`', 'document/window', 'Event target'],
    ],
    returns: [['`dispose()`', '`void`', 'Remove `keydown` listener']],
  },
  {
    slug: 'key-press',
    name: 'keyPress',
    description: 'Track whether a single key is currently held.',
    usage: sig(`
import { keyPress } from '@echojs-ecosystem/utils/key-press'

const space = keyPress(' ', () => console.log('space'))
space.pressed()
space.dispose()
`),
    types: sig(`
export interface KeyPressOptions {
  target?: Document | Window
  byCode?: boolean
}

export const keyPress: (
  key: string,
  handler?: (event: KeyboardEvent) => void,
  options?: KeyPressOptions,
) => {
  pressed: () => boolean
  $pressed: Signal<boolean>
  dispose: () => void
}
`),
    params: [
      ['`key`', '`string`', '—', 'Key to match (`event.key` or `space`)'],
      ['`handler`', '`(event) => void`', 'optional', 'Called on matching keydown'],
      ['`options.byCode`', '`boolean`', '`false`', 'Match `event.code` instead'],
    ],
    returns: [
      ['`pressed()`', '`boolean`', 'Key is currently held'],
      ['`dispose()`', '`void`', 'Remove key listeners'],
    ],
  },
  {
    slug: 'page-leave',
    name: 'pageLeave',
    description: 'Fire when the pointer leaves the document.',
    usage: sig(`
import { pageLeave } from '@echojs-ecosystem/utils/page-leave'

const leave = pageLeave(() => pauseVideo())
leave.dispose()
`),
    types: sig(`
export const pageLeave: (handler: () => void) => { dispose: () => void }
`),
    params: [['`handler`', '`() => void`', '—', 'Called on `mouseleave`']],
    returns: [['`dispose()`', '`void`', 'Remove listener']],
  },

  // ─── Browser ─────────────────────────────────────────────
  {
    slug: 'active-element',
    name: 'activeElement',
    description: 'Signal-native tracking of `document.activeElement` on `focusin` / `focusout`.',
    keywords: ['activeElement', 'focus', 'browser'],
    hasDemo: true,
    usage: sig(`
import { activeElement } from '@echojs-ecosystem/utils/active-element'

const active = activeElement()
active.value()
active.$value
active.dispose()
`),
    types: sig(`
import type { ReadonlySignal } from '@echojs-ecosystem/reactivity'

export interface ActiveElementResult {
  value: () => Element | null
  $value: ReadonlySignal<Element | null>
  dispose: () => void
}

export const activeElement: () => ActiveElementResult
`),
    returns: [
      ['`value()`', '`Element | null`', 'Current `document.activeElement` (non-tracking read via `peek`)'],
      ['`$value`', '`ReadonlySignal<Element | null>`', 'Reactive signal for bindings'],
      ['`dispose()`', '`void`', 'Remove `focusin` / `focusout` listeners'],
    ],
    ssr: 'On the server `value()` is `null` — no listeners until the client.',
    related: ['focus', 'event-listener'],
  },
  {
    slug: 'clipboard',
    name: 'clipboard',
    description: 'Copy text via the Clipboard API.',
    usage: sig(`
import { clipboard } from '@echojs-ecosystem/utils/clipboard'

const clip = clipboard()
await clip.copy('Hello EchoJS')
clip.copied()
clip.dispose()
`),
    types: sig(`
export const clipboard: () => {
  copy: (text: string) => Promise<void>
  text: () => string
  copied: () => boolean
  error: () => unknown
  $text: Signal<string>
  $copied: Signal<boolean>
  $error: Signal<unknown>
  dispose: () => void
}
`),
    returns: [
      ['`copy(text)`', '`Promise<void>`', 'Write to clipboard; throws if unavailable'],
      ['`copied()`', '`boolean`', '`true` ~2s after success'],
      ['`text()`', '`string`', 'Last copied text'],
      ['`error()`', '`unknown`', 'Last error or `null`'],
      ['`dispose()`', '`void`', 'Clear copied reset timer'],
    ],
    ssr: '`copy()` throws when `navigator.clipboard` is missing.',
  },
  {
    slug: 'document-title',
    name: 'documentTitle',
    description: 'Read and set `document.title`; restores on dispose.',
    usage: sig(`
import { documentTitle } from '@echojs-ecosystem/utils/document-title'

const title = documentTitle('EchoJS Docs')
title.set('New title')
title.dispose() // restores previous title
`),
    types: sig(`
export const documentTitle: (initialTitle?: string) => {
  value: () => string
  set: (title: string) => void
  $value: Signal<string>
  dispose: () => void
}
`),
    params: [['`initialTitle`', '`string`', 'current title', 'Starting title']],
    returns: [
      ['`value()`', '`string`', 'Current title'],
      ['`set(title)`', '`void`', 'Update `document.title`'],
      ['`dispose()`', '`void`', 'Restore title from before create'],
    ],
  },
  {
    slug: 'favicon',
    name: 'favicon',
    description: 'Read and update `<link rel="icon">` href.',
    usage: sig(`
import { favicon } from '@echojs-ecosystem/utils/favicon'

const icon = favicon('/favicon.svg')
icon.set('/favicon-dark.svg')
icon.dispose()
`),
    types: sig(`
export const favicon: (initialHref?: string) => {
  value: () => string
  set: (href: string) => void
  $href: Signal<string>
  dispose: () => void
}
`),
    returns: [
      ['`value()`', '`string`', 'Current favicon href'],
      ['`set(href)`', '`void`', 'Update link href'],
      ['`dispose()`', '`void`', 'Restore previous href'],
    ],
  },
  {
    slug: 'color-scheme',
    name: 'colorScheme',
    description: 'Light / dark / auto theme with `data-color-scheme` on `<html>`.',
    usage: sig(`
import { colorScheme } from '@echojs-ecosystem/utils/color-scheme'

const scheme = colorScheme('auto')
scheme.set('dark')
scheme.toggle()
scheme.value()      // resolved 'light' | 'dark'
scheme.preference() // 'light' | 'dark' | 'auto'
scheme.dispose()
`),
    types: sig(`
export type ColorSchemePreference = 'light' | 'dark' | 'auto'

export const colorScheme: (initial?: ColorSchemePreference) => {
  value: () => 'light' | 'dark'
  preference: () => ColorSchemePreference
  set: (next: ColorSchemePreference) => void
  toggle: () => void
  $value: ComputedSignal<'light' | 'dark'>
  $preference: Signal<ColorSchemePreference>
  dispose: () => void
}
`),
    params: [['`initial`', '`ColorSchemePreference`', '`auto`', 'User preference']],
    returns: [
      ['`value()`', '`light | dark`', 'Resolved scheme'],
      ['`preference()`', '`ColorSchemePreference`', 'Stored preference'],
      ['`set` / `toggle`', '`void`', 'Change preference'],
      ['`dispose()`', '`void`', 'Remove `prefers-color-scheme` listener'],
    ],
  },
  {
    slug: 'event-listener',
    name: 'eventListener',
    description: 'Attach a DOM listener with reactive target and `dispose`.',
    usage: sig(`
import { eventListener } from '@echojs-ecosystem/utils/event-listener'

const { dispose } = eventListener(window, 'resize', onResize, { passive: true })
dispose()
`),
    types: sig(`
export const eventListener: <E extends Event>(
  target: MaybeEventTarget,
  event: string,
  handler: (event: E) => void,
  options?: boolean | AddEventListenerOptions,
) => { dispose: () => void }
`),
    params: [
      ['`target`', '`MaybeEventTarget`', '—', 'Element, window, signal, or getter'],
      ['`event`', '`string`', '—', 'Event name'],
      ['`handler`', '`(event) => void`', '—', 'Listener callback'],
      ['`options`', '`AddEventListenerOptions`', '—', 'Passed to `addEventListener`'],
    ],
    returns: [['`dispose()`', '`void`', 'Remove listener']],
    ssr: 'No-op on the server — `dispose` is still safe.',
  },
  {
    slug: 'document-visibility',
    name: 'documentVisibility',
    description: 'Track tab visibility (`visible` / `hidden`).',
    usage: sig(`
import { documentVisibility } from '@echojs-ecosystem/utils/document-visibility'

const vis = documentVisibility()
vis.visible()
vis.hidden()
vis.dispose()
`),
    types: sig(`
export type DocumentVisibilityState = Document['visibilityState']

export const documentVisibility: () => {
  value: () => DocumentVisibilityState
  hidden: () => boolean
  visible: () => boolean
  $value: Signal<DocumentVisibilityState>
  dispose: () => void
}
`),
    returns: [
      ['`value()`', '`DocumentVisibilityState`', 'Raw visibility state'],
      ['`visible()` / `hidden()`', '`boolean`', 'Convenience helpers'],
      ['`dispose()`', '`void`', 'Remove `visibilitychange` listener'],
    ],
  },
  {
    slug: 'device-pixel-ratio',
    name: 'devicePixelRatio',
    description: 'Reactive `window.devicePixelRatio`.',
    usage: sig(`
import { devicePixelRatio } from '@echojs-ecosystem/utils/device-pixel-ratio'

const dpr = devicePixelRatio({ initial: 1 })
dpr.value()
dpr.dispose()
`),
    types: sig(`
export interface DevicePixelRatioOptions {
  window?: Window
  initial?: number
}

export const devicePixelRatio: (options?: DevicePixelRatioOptions) => {
  value: () => number
  $value: Signal<number>
  dispose: () => void
}
`),
    params: [
      ['`options.window`', '`Window`', '`defaultWindow`', 'Target window'],
      ['`options.initial`', '`number`', '`1`', 'SSR default'],
    ],
    returns: [
      ['`value()`', '`number`', 'Current DPR'],
      ['`dispose()`', '`void`', 'Remove `resize` listener'],
    ],
  },
  {
    slug: 'fullscreen',
    name: 'fullscreen',
    description: 'Enter, exit, and track fullscreen state.',
    usage: sig(`
import { fullscreen } from '@echojs-ecosystem/utils/fullscreen'

const fs = fullscreen(document.documentElement)
await fs.enter()
await fs.toggle()
fs.isFullscreen()
fs.dispose()
`),
    types: sig(`
export type FullscreenTarget = Element | null | undefined

export const fullscreen: (target?: MaybeSignalOrGetter<FullscreenTarget>) => {
  isFullscreen: () => boolean
  $isFullscreen: Signal<boolean>
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
  dispose: () => void
}
`),
    params: [['`target`', '`MaybeSignalOrGetter<Element>`', '`<html>`', 'Fullscreen element']],
    returns: [
      ['`enter()` / `exit()` / `toggle()`', '`Promise<void>`', 'Fullscreen API'],
      ['`isFullscreen()`', '`boolean`', 'Whether an element is fullscreen'],
      ['`dispose()`', '`void`', 'Remove `fullscreenchange` listener'],
    ],
  },
  {
    slug: 'permission',
    name: 'permission',
    description: 'Query Permissions API state for a feature.',
    usage: sig(`
import { permission } from '@echojs-ecosystem/utils/permission'

const cam = permission('camera')
cam.state()     // PermissionState | 'unsupported'
cam.supported()
cam.dispose()
`),
    types: sig(`
export type PermissionQueryState = PermissionState | 'unsupported'

export const permission: (name: PermissionName) => {
  state: () => PermissionQueryState
  supported: () => boolean
  $state: Signal<PermissionQueryState>
  $supported: Signal<boolean>
  dispose: () => void
}
`),
    params: [['`name`', '`PermissionName`', '—', 'e.g. `geolocation`, `notifications`']],
    returns: [
      ['`state()`', '`PermissionQueryState`', 'Current permission state'],
      ['`supported()`', '`boolean`', 'Whether query succeeded'],
      ['`dispose()`', '`void`', 'Remove `change` listener'],
    ],
  },
  {
    slug: 'css-var',
    name: 'cssVar',
    description: 'Read and write CSS custom properties.',
    usage: sig(`
import { cssVar } from '@echojs-ecosystem/utils/css-var'

const theme = cssVar('accent', document.documentElement, '#000')
theme.set('#3b82f6')
theme.refresh()
theme.dispose()
`),
    types: sig(`
export type CssVarTarget = HTMLElement | null | undefined

export const cssVar: (
  name: string,
  target?: MaybeSignalOrGetter<CssVarTarget>,
  initial?: string,
) => {
  value: () => string
  set: (next: string) => void
  refresh: () => void
  $value: Signal<string>
  dispose: () => void
}
`),
    params: [
      ['`name`', '`string`', '—', 'Variable name (with or without `--`)'],
      ['`target`', '`MaybeSignalOrGetter<HTMLElement>`', '`:root`', 'Element scope'],
      ['`initial`', '`string`', '`""`', 'Fallback before read'],
    ],
    returns: [
      ['`value()`', '`string`', 'Computed value'],
      ['`set(next)`', '`void`', 'Set via `style.setProperty`'],
      ['`refresh()`', '`void`', 'Re-read from computed style'],
      ['`dispose()`', '`void`', 'Teardown reactive target effect'],
    ],
  },

  // ─── Timing ──────────────────────────────────────────────
  {
    slug: 'timeout',
    name: 'timeout',
    description: 'One-shot delayed callback with start/stop control.',
    usage: sig(`
import { timeout } from '@echojs-ecosystem/utils/timeout'

const t = timeout(() => console.log('done'), 1000)
t.start()
t.stop()
t.dispose()
`),
    types: sig(`
export const timeout: (callback: () => void, delay: number) => {
  start: () => void
  stop: () => void
  restart: () => void
  pending: () => boolean
  $pending: Signal<boolean>
  dispose: () => void
}
`),
    params: [
      ['`callback`', '`() => void`', '—', 'Runs after delay'],
      ['`delay`', '`number`', '—', 'Milliseconds'],
    ],
    returns: [
      ['`start()`', '`void`', 'Schedule callback (not auto-started)'],
      ['`stop()` / `restart()`', '`void`', 'Cancel or reschedule'],
      ['`pending()`', '`boolean`', 'Timer is active'],
      ['`dispose()`', '`void`', 'Clear timer'],
    ],
    ssr: '`start()` is a no-op on the server.',
  },
  {
    slug: 'interval',
    name: 'interval',
    description: 'Repeating interval callback.',
    usage: sig(`
import { interval } from '@echojs-ecosystem/utils/interval'

const tick = interval(() => poll(), 5000)
tick.start()
tick.stop()
tick.dispose()
`),
    types: sig(`
export const interval: (callback: () => void, delay: number) => {
  start: () => void
  stop: () => void
  active: () => boolean
  $active: Signal<boolean>
  dispose: () => void
}
`),
    params: [
      ['`callback`', '`() => void`', '—', 'Runs every `delay` ms'],
      ['`delay`', '`number`', '—', 'Interval in ms'],
    ],
    returns: [
      ['`start()` / `stop()`', '`void`', 'Control interval'],
      ['`active()`', '`boolean`', 'Interval is running'],
      ['`dispose()`', '`void`', 'Clear interval'],
    ],
  },
  {
    slug: 'debounce',
    name: 'debounce',
    description: 'Debounce a signal or a function.',
    usage: sig(`
import { signal } from '@echojs-ecosystem/reactivity'
import { debounce, debounceFn } from '@echojs-ecosystem/utils/debounce'

const $q = signal('')
const debounced = debounce($q, 300)

const search = debounceFn((q: string) => fetch(q), 300)
search.flush()
`),
    types: sig(`
export const debounce: <T>(source: ReadonlySignal<T>, ms: number) => {
  value: () => T
  $value: Signal<T>
  dispose: () => void
}

export type DebouncedFn<T extends (...args: never[]) => void> = T & {
  cancel(): void
  flush(): void
}

export const debounceFn: <T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
) => DebouncedFn<T>
`),
    params: [
      ['`debounce(source, ms)`', '—', '—', 'Debounces signal updates'],
      ['`debounceFn(fn, ms)`', '—', '—', 'Debounces function calls'],
    ],
    returns: [
      ['`value()`', '`T`', 'Debounced signal value'],
      ['`debounceFn.cancel()`', '`void`', 'Drop pending call'],
      ['`debounceFn.flush()`', '`void`', 'Run pending call immediately'],
      ['`dispose()`', '`void`', 'Cancel timers / stop effect'],
    ],
    ssr: 'On server, updates apply immediately (no timer).',
  },
  {
    slug: 'throttle',
    name: 'throttle',
    description: 'Throttle a signal or a function.',
    usage: sig(`
import { signal } from '@echojs-ecosystem/reactivity'
import { throttle, throttleFn } from '@echojs-ecosystem/utils/throttle'

const $y = signal(0)
const throttled = throttle($y, 100)

const onScroll = throttleFn(() => save(), 100)
`),
    types: sig(`
export const throttle: <T>(source: ReadonlySignal<T>, ms: number) => {
  value: () => T
  $value: Signal<T>
  dispose: () => void
}

export type ThrottledFn<T extends (...args: never[]) => void> = T & {
  cancel(): void
  flush(): void
}

export const throttleFn: <T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
) => ThrottledFn<T>
`),
    returns: [
      ['`value()`', '`T`', 'Throttled signal value'],
      ['`throttleFn.cancel()` / `flush()`', '`void`', 'Control pending invocation'],
      ['`dispose()`', '`void`', 'Cancel timers / stop effect'],
    ],
    ssr: 'On server, updates apply immediately.',
  },

  // ─── State ───────────────────────────────────────────────
  {
    slug: 'toggle',
    name: 'toggle',
    description: 'Boolean state with `on`, `off`, `toggle`, `set`.',
    usage: sig(`
import { toggle } from '@echojs-ecosystem/utils/toggle'

const panel = toggle(false)
panel.on()
panel.toggle()
panel.value()
`),
    types: sig(`
export const toggle: (initial?: boolean) => {
  value: () => boolean
  on: () => void
  off: () => void
  toggle: () => void
  set: (next: boolean) => void
  $value: Signal<boolean>
  dispose: () => void
}
`),
    params: [['`initial`', '`boolean`', '`false`', 'Starting value']],
    returns: [
      ['`value()`', '`boolean`', 'Current state'],
      ['`on` / `off` / `toggle` / `set`', '`void`', 'Mutate state'],
      ['`dispose()`', '`void`', 'No-op'],
    ],
  },
  {
    slug: 'counter',
    name: 'counter',
    description: 'Numeric counter with optional min/max clamp.',
    usage: sig(`
import { counter } from '@echojs-ecosystem/utils/counter'

const page = counter(1, { min: 1, max: 10 })
page.inc()
page.dec(2)
page.reset()
`),
    types: sig(`
export interface CounterOptions {
  min?: number
  max?: number
}

export const counter: (initial?: number, options?: CounterOptions) => {
  value: () => number
  inc: (step?: number) => void
  dec: (step?: number) => void
  set: (next: number) => void
  reset: () => void
  $value: Signal<number>
  dispose: () => void
}
`),
    params: [
      ['`initial`', '`number`', '`0`', 'Starting value'],
      ['`options.min` / `max`', '`number`', '—', 'Clamp bounds'],
    ],
    returns: [
      ['`inc(step?)` / `dec(step?)`', '`void`', 'Add / subtract (default 1)'],
      ['`set(n)`', '`void`', 'Set clamped value'],
      ['`reset()`', '`void`', 'Back to initial'],
    ],
  },
  {
    slug: 'boolean',
    name: 'boolean',
    description: 'Alias of `toggle` with boolean semantics.',
    usage: sig(`
import { boolean } from '@echojs-ecosystem/utils/boolean'

const flag = boolean(true)
flag.value()
`),
    types: sig(`
export const boolean: (initial?: boolean) => ReturnType<typeof toggle>
`),
    related: ['toggle'],
  },
  {
    slug: 'previous',
    name: 'previous',
    description: 'Previous value of a source signal.',
    usage: sig(`
import { signal } from '@echojs-ecosystem/reactivity'
import { previous } from '@echojs-ecosystem/utils/previous'

const $n = signal(1)
const prev = previous($n)
$n.set(2)
prev.value() // 1
prev.dispose()
`),
    types: sig(`
export const previous: <T>(source: ReadonlySignal<T>) => {
  value: () => T | undefined
  $value: Signal<T | undefined>
  dispose: () => void
}
`),
    params: [['`source`', '`ReadonlySignal<T>`', '—', 'Signal to track']],
    returns: [
      ['`value()`', '`T | undefined`', 'Previous value (`undefined` on first run)'],
      ['`dispose()`', '`void`', 'Stop effect'],
    ],
  },
  {
    slug: 'local-storage',
    name: 'localStorage',
    description: 'Persist and sync a value with `localStorage`.',
    usage: sig(`
import { localStorage as storage } from '@echojs-ecosystem/utils/local-storage'

const prefs = storage('echo:prefs', { theme: 'light' })
prefs.set({ theme: 'dark' })
prefs.remove()
prefs.dispose()
`),
    types: sig(`
export interface LocalStorageOptions<T> {
  storage?: Storage
  serialize?: (value: T) => string
  deserialize?: (raw: string) => T
}

export const localStorage: <T>(
  key: string,
  initial: T,
  options?: LocalStorageOptions<T>,
) => {
  value: () => T
  set: (next: T) => void
  remove: () => void
  $value: Signal<T>
  dispose: () => void
}
`),
    params: [
      ['`key`', '`string`', '—', 'Storage key'],
      ['`initial`', '`T`', '—', 'Default when missing'],
      ['`options.storage`', '`Storage`', '`localStorage`', 'Custom storage area'],
      ['`options.serialize`', '`(T) => string`', 'JSON.stringify', 'Custom encode'],
    ],
    returns: [
      ['`value()` / `set()`', '`T`', 'Read / write value'],
      ['`remove()`', '`void`', 'Delete key, reset to initial'],
      ['`dispose()`', '`void`', 'Remove `storage` event listener'],
    ],
    ssr: 'Reads `initial` only — no `localStorage` on server.',
  },
  {
    slug: 'hash',
    name: 'hash',
    description: 'Sync with `location.hash` (without leading `#`).',
    usage: sig(`
import { hash } from '@echojs-ecosystem/utils/hash'

const route = hash()
route.set('section-2')
route.value()
route.dispose()
`),
    types: sig(`
export const hash: (initial?: string) => {
  value: () => string
  set: (next: string) => void
  $value: Signal<string>
  dispose: () => void
}
`),
    returns: [
      ['`value()`', '`string`', 'Hash without `#`'],
      ['`set(next)`', '`void`', 'Update signal and `location.hash`'],
      ['`dispose()`', '`void`', 'Remove `hashchange` listener'],
    ],
  },

  // ─── DOM ─────────────────────────────────────────────────
  {
    slug: 'element-size',
    name: 'elementSize',
    description: 'Element width and height via `ResizeObserver`.',
    usage: sig(`
import { signal } from '@echojs-ecosystem/reactivity'
import { elementSize } from '@echojs-ecosystem/utils/element-size'

const $el = signal<HTMLDivElement | null>(null)
const size = elementSize($el)
size.width()
size.height()
size.dispose()
`),
    types: sig(`
export type ElementTarget = HTMLElement | null | undefined

export const elementSize: (target: MaybeSignalOrGetter<ElementTarget>) => {
  width: () => number
  height: () => number
  $width: Signal<number>
  $height: Signal<number>
  dispose: () => void
}
`),
    params: [['`target`', '`MaybeSignalOrGetter<ElementTarget>`', '—', 'Element to measure']],
    returns: [
      ['`width()` / `height()`', '`number`', 'Content dimensions'],
      ['`dispose()`', '`void`', 'Disconnect observer'],
    ],
  },
  {
    slug: 'resize-observer',
    name: 'resizeObserver',
    description: 'Low-level `ResizeObserver` on a reactive target.',
    usage: sig(`
import { resizeObserver } from '@echojs-ecosystem/utils/resize-observer'

const ro = resizeObserver($el, (entries) => {
  console.log(entries[0]?.contentRect)
})
ro.dispose()
`),
    types: sig(`
export type ResizeObserverTarget = Element | null | undefined

export const resizeObserver: (
  target: MaybeSignalOrGetter<ResizeObserverTarget>,
  callback: ResizeObserverCallback,
) => { dispose: () => void }
`),
    params: [
      ['`target`', '`MaybeSignalOrGetter<Element>`', '—', 'Observed element'],
      ['`callback`', '`ResizeObserverCallback`', '—', 'Resize handler'],
    ],
    returns: [['`dispose()`', '`void`', 'Disconnect observer']],
  },
  {
    slug: 'intersection-observer',
    name: 'intersectionObserver',
    description: 'Track whether an element intersects the viewport.',
    usage: sig(`
import { intersectionObserver } from '@echojs-ecosystem/utils/intersection-observer'

const vis = intersectionObserver($el, { threshold: 0.5 })
vis.isIntersecting()
vis.entry()
vis.dispose()
`),
    types: sig(`
export type IntersectionTarget = Element | null | undefined

export interface IntersectionObserverResult {
  isIntersecting: () => boolean
  entry: () => IntersectionObserverEntry | null
  $isIntersecting: ReadonlySignal<boolean>
  $entry: ReadonlySignal<IntersectionObserverEntry | null>
  dispose: () => void
}

export const intersectionObserver: (
  target: MaybeSignalOrGetter<IntersectionTarget>,
  options?: IntersectionObserverInit,
) => IntersectionObserverResult
`),
    params: [
      ['`target`', '`MaybeSignalOrGetter<Element>`', '—', 'Observed element'],
      ['`options`', '`IntersectionObserverInit`', '—', 'Observer options'],
    ],
    returns: [
      ['`isIntersecting()`', '`boolean`', 'Latest intersection flag'],
      ['`entry()`', '`IntersectionObserverEntry | null`', 'Latest entry'],
      ['`dispose()`', '`void`', 'Disconnect observer'],
    ],
  },
  {
    slug: 'click-outside',
    name: 'clickOutside',
    description: 'Call handler when pointer down occurs outside the target.',
    usage: sig(`
import { clickOutside } from '@echojs-ecosystem/utils/click-outside'

const dismiss = clickOutside($panel, () => close())
dismiss.dispose()
`),
    types: sig(`
export type ClickOutsideTarget = HTMLElement | null | undefined

export const clickOutside: (
  target: MaybeSignalOrGetter<ClickOutsideTarget>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => { dispose: () => void }
`),
    params: [
      ['`target`', '`MaybeSignalOrGetter<HTMLElement>`', '—', 'Inside boundary'],
      ['`handler`', '`(event) => void`', '—', 'Outside click handler'],
    ],
    returns: [['`dispose()`', '`void`', 'Remove document listeners']],
  },
  {
    slug: 'hover',
    name: 'hover',
    description: 'Whether the pointer is over an element.',
    usage: sig(`
import { hover } from '@echojs-ecosystem/utils/hover'

const isOver = hover($button)
isOver.value()
isOver.dispose()
`),
    types: sig(`
export type HoverTarget = HTMLElement | null | undefined

export const hover: (target: MaybeSignalOrGetter<HoverTarget>) => {
  value: () => boolean
  $value: Signal<boolean>
  dispose: () => void
}
`),
    returns: [
      ['`value()`', '`boolean`', 'Pointer is over element'],
      ['`dispose()`', '`void`', 'Remove hover listeners'],
    ],
  },
  {
    slug: 'focus',
    name: 'focus',
    description: 'Focus state and imperative `focus()` / `blur()`.',
    usage: sig(`
import { focus } from '@echojs-ecosystem/utils/focus'

const input = focus($ref)
input.focused()
input.focus()
input.dispose()
`),
    types: sig(`
export type FocusTarget = HTMLElement | null | undefined

export const focus: (target: MaybeSignalOrGetter<FocusTarget>) => {
  focused: () => boolean
  $focused: Signal<boolean>
  focus: () => void
  blur: () => void
  dispose: () => void
}
`),
    returns: [
      ['`focused()`', '`boolean`', 'Element has focus'],
      ['`focus()` / `blur()`', '`void`', 'Imperative focus control'],
      ['`dispose()`', '`void`', 'Remove focus listeners'],
    ],
    related: ['active-element'],
  },

  // ─── Core ────────────────────────────────────────────────
  {
    slug: 'is',
    name: 'is',
    description: 'Runtime type guards and emptiness checks — dedicated subpath.',
    usage: sig(`
import { isString, isEmptyArray, isDefined } from '@echojs-ecosystem/utils/is'

if (isDefined(user)) save(user.name)
if (isEmptyArray(items)) return
`),
    types: sig(`
export const isString: (value: unknown) => value is string
export const isBoolean: (value: unknown) => value is boolean
export const isNumber: (value: unknown) => value is number
export const isBigInt: (value: unknown) => value is bigint
export const isSymbol: (value: unknown) => value is symbol
export const isUndefined: (value: unknown) => value is undefined
export const isNull: (value: unknown) => value is null
export const isNullable: (value: unknown) => value is null | undefined
export const isNullish: typeof isNullable
export const isNil: typeof isNullable
export const isDefined: <T>(value: T | null | undefined) => value is T
export const isFunction: (value: unknown) => value is (...args: never[]) => unknown
export const isArray: (value: unknown) => value is unknown[]
export const isObjectLike: (value: unknown) => value is object
export const isObject: (value: unknown) => value is Record<string, unknown>
export const isPlainObject: (value: unknown) => value is Record<string, unknown>
export const isDate: (value: unknown) => value is Date
export const isRegExp: (value: unknown) => value is RegExp
export const isError: (value: unknown) => value is Error
export const isPromise: <T = unknown>(value: unknown) => value is Promise<T>
export const isMap: <K, V>(value: unknown) => value is Map<K, V>
export const isSet: <T>(value: unknown) => value is Set<T>
export const isWeakMap: <K extends object, V>(value: unknown) => value is WeakMap<K, V>
export const isWeakSet: <T extends object>(value: unknown) => value is WeakSet<T>
export const isPrimitive: (value: unknown) => value is string | number | boolean | bigint | symbol | null | undefined
export const isInteger: (value: unknown) => value is number
export const isFiniteNumber: (value: unknown) => value is number
export const isNaN: (value: unknown) => value is number
export const isEmptyString: (value: unknown) => value is ''
export const isEmptyArray: (value: unknown) => value is never[]
export const isEmptyObject: (value: unknown) => boolean
export const isEmpty: (value: unknown) => boolean
export const isNonEmptyArray: <T>(value: unknown) => value is [T, ...T[]]
export const hasOwn: <T extends object, K extends PropertyKey>(
  value: T,
  key: K,
) => value is T & Record<K, unknown>
`),
    returns: [
      ['Each guard', '`boolean`', 'Runtime check; narrows TypeScript types'],
    ],
    isModule: true,
  },
]
