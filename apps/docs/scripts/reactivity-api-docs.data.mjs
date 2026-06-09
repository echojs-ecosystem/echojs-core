/** Doc content for @echojs-ecosystem/reactivity API pages. */

const sig = (s) => s.trim()

export const reactivityApiDocs = [
  {
    slug: 'signal',
    name: 'signal',
    description: 'Create a writable reactive cell with `value`, `set`, and `update`.',
    keywords: ['signal', 'writable', 'reactivity'],
    usage: sig(`
import { signal } from '@echojs-ecosystem/reactivity'

const $count = signal(0)
$count.set(1)
$count.update((n) => n + 1)
$count.value()
`),
    types: sig(`
export interface Signal<T> extends ReadonlySignal<T> {
  set(next: T): void
  update(fn: (prev: T) => T): void
  readonly(): ReadonlySignal<T>
}

export const signal: <T>(initial: T) => Signal<T>
`),
    params: [['`initial`', '`T`', '—', 'Required starting value; `signal()` without args throws']],
    returns: [
      ['`.value()`', '`ReadValue<T>`', 'Read with dependency tracking'],
      ['`.peek()`', '`ReadValue<T>`', 'Read without tracking'],
      ['`.set(next)`', '`void`', 'Replace value'],
      ['`.update(fn)`', '`void`', 'Set from previous value'],
      ['`.subscribe(fn)`', '`() => void`', 'Change listener; not called on subscribe'],
      ['`.readonly()`', '`ReadonlySignal<T>`', 'Readonly facade without set/update'],
    ],
    related: ['computed', 'types'],
  },
  {
    slug: 'computed',
    name: 'computed',
    description: 'Create a readonly derived signal from a getter function.',
    keywords: ['computed', 'derived', 'reactivity'],
    usage: sig(`
import { computed, signal } from '@echojs-ecosystem/reactivity'

const $a = signal(1)
const $double = computed(() => $a.value() * 2)
$double.value()
`),
    types: sig(`
export const computed: <T>(getter: () => T) => ReadonlySignal<T>
`),
    params: [['`getter`', '`() => T`', '—', 'Re-runs when tracked deps inside change']],
    returns: [
      ['`.value()`', '`ReadValue<T>`', 'Read (tracks deps, may recompute)'],
      ['`.peek()`', '`ReadValue<T>`', 'Read without tracking'],
      ['`.subscribe(fn)`', '`() => void`', 'Same change-only contract as `signal`'],
    ],
    related: ['signal', 'effect'],
  },
  {
    slug: 'readonly',
    name: 'readonly',
    description: 'Return a readonly view of a writable or readonly signal.',
    keywords: ['readonly', 'reactivity'],
    usage: sig(`
import { readonly, signal } from '@echojs-ecosystem/reactivity'

const $internal = signal(0)
export const count = readonly($internal)
// or: $internal.readonly()
`),
    types: sig(`
export const readonly: <T>(
  sig: Signal<T> | ReadonlySignal<T>,
) => ReadonlySignal<T>
`),
    params: [['`sig`', '`Signal<T> | ReadonlySignal<T>`', '—', 'Source signal']],
    returns: [
      ['`ReadonlySignal<T>`', '—', 'Read + subscribe only; no `.set()` / `.update()`'],
    ],
    related: ['signal', 'types'],
  },
  {
    slug: 'effect',
    name: 'effect',
    description: 'Run a side effect when tracked dependencies change.',
    keywords: ['effect', 'reactivity'],
    usage: sig(`
import { effect, signal } from '@echojs-ecosystem/reactivity'

const $n = signal(0)
const stop = effect(() => console.log($n.value()))
stop()
`),
    types: sig(`
export const effect: (fn: () => void) => () => void
`),
    params: [['`fn`', '`() => void`', '—', 'Runs synchronously, then on dep changes']],
    returns: [['disposer', '`() => void`', 'Stops the effect']],
    related: ['scope', 'cleanup'],
  },
  {
    slug: 'batch',
    name: 'batch',
    description: 'Defer reactive notifications until a synchronous block completes.',
    keywords: ['batch', 'reactivity'],
    usage: sig(`
import { batch, signal } from '@echojs-ecosystem/reactivity'

const $a = signal(0)
const $b = signal(0)

batch(() => {
  $a.set(1)
  $b.set(2)
})
`),
    types: sig(`
export const batch: <T>(fn: () => T) => T
`),
    params: [['`fn`', '`() => T`', '—', 'Synchronous block; returns `fn()` result']],
    returns: [['result', '`T`', 'Return value of `fn`']],
    related: ['signal', 'effect'],
  },
  {
    slug: 'scope',
    name: 'scope',
    description: 'Create a disposable effect scope with registered cleanups.',
    keywords: ['scope', 'cleanup', 'reactivity'],
    usage: sig(`
import { scope, effect, cleanup } from '@echojs-ecosystem/reactivity'

const stop = scope(() => {
  effect(() => { /* … */ })
  cleanup(() => { /* teardown */ })
})

stop()
`),
    types: sig(`
export const scope: (fn: () => void) => () => void
`),
    params: [['`fn`', '`() => void`', '—', 'Body runs inside a new scope']],
    returns: [['disposer', '`() => void`', 'Tears down effects and `cleanup()` callbacks']],
    related: ['cleanup', 'effect'],
  },
  {
    slug: 'cleanup',
    name: 'cleanup',
    description: 'Register teardown to run when the current `scope()` disposes.',
    keywords: ['cleanup', 'scope', 'reactivity'],
    usage: sig(`
import { scope, cleanup } from '@echojs-ecosystem/reactivity'

scope(() => {
  const id = setInterval(tick, 1000)
  cleanup(() => clearInterval(id))
})
`),
    types: sig(`
export const cleanup: (fn: () => void) => void
`),
    params: [
      [
        '`fn`',
        '`() => void`',
        '—',
        'Must be called inside `scope()` or throws',
      ],
    ],
    returns: [['—', '`void`', 'Registers fn on the active scope bucket']],
    related: ['scope'],
  },
  {
    slug: 'type-guards',
    name: 'Type guards',
    description: 'Runtime type guards for branded signal instances.',
    keywords: ['isSignal', 'isReadonlySignal', 'reactivity'],
    usage: sig(`
import { isSignal, isReadonlySignal, signal, computed } from '@echojs-ecosystem/reactivity'

if (isSignal(maybe)) maybe.value()
if (isReadonlySignal(maybe)) maybe.value()
`),
    types: sig(`
export const isSignal: (
  value: unknown,
) => value is Signal<unknown> | ReadonlySignal<unknown>

export const isReadonlySignal: (
  value: unknown,
) => value is ReadonlySignal<unknown>
`),
    returns: [
      ['`isSignal`', '`boolean`', 'Writable or readonly branded signal'],
      ['`isReadonlySignal`', '`boolean`', 'Readonly / computed-style signal'],
    ],
    isModule: true,
    related: ['types'],
  },
  {
    slug: 'types',
    name: 'Types',
    description: 'Public TypeScript types exported from the package.',
    keywords: ['Signal', 'ReadonlySignal', 'ReadValue', 'DeepReadonly'],
    usage: sig(`
import type {
  Signal,
  ReadonlySignal,
  ReadValue,
  DeepReadonly,
} from '@echojs-ecosystem/reactivity'
`),
    types: sig(`
export interface ReadonlySignal<T> {
  value(): ReadValue<T>
  peek(): ReadValue<T>
  subscribe(fn: () => void): () => void
}

export interface Signal<T> extends ReadonlySignal<T> {
  set(next: T): void
  update(fn: (prev: T) => T): void
  readonly(): ReadonlySignal<T>
}

export type ReadValue<T> = T extends object ? DeepReadonly<T> : T

export type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends readonly (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T
`),
    returns: [
      ['`Signal<T>`', 'interface', 'Writable signal'],
      ['`ReadonlySignal<T>`', 'interface', 'Read + subscribe only'],
      ['`ReadValue<T>`', 'type', 'Result of `.value()` / `.peek()`'],
      ['`DeepReadonly<T>`', 'type', 'Recursive readonly for object reads'],
    ],
    isModule: true,
    related: ['signal', 'type-guards'],
  },
]
