/** Single source of truth for @echojs-ecosystem/reactivity docs navigation & generators. */

export type ReactivityDocCategory = {
  id: string
  title: string
  entries: ReactivityDocEntry[]
}

export type ReactivityDocEntry = {
  slug: string
  name: string
  description: string
}

export const reactivityDocCategories: ReactivityDocCategory[] = [
  {
    id: 'signals',
    title: 'Signals',
    entries: [
      { slug: 'signal', name: 'signal', description: 'Writable reactive cell.' },
      { slug: 'computed', name: 'computed', description: 'Readonly derived signal.' },
      { slug: 'readonly', name: 'readonly', description: 'Readonly view of a signal.' },
    ],
  },
  {
    id: 'effects',
    title: 'Effects & scopes',
    entries: [
      { slug: 'effect', name: 'effect', description: 'Side effect with auto tracking.' },
      { slug: 'batch', name: 'batch', description: 'Coalesce reactive notifications.' },
      { slug: 'scope', name: 'scope', description: 'Disposable effect scope.' },
      { slug: 'cleanup', name: 'cleanup', description: 'Register scope teardown.' },
    ],
  },
  {
    id: 'events',
    title: 'Events',
    entries: [
      {
        slug: 'event-emitter',
        name: 'createEventEmitter',
        description: 'Typed chainable pub/sub bus.',
      },
    ],
  },
  {
    id: 'types',
    title: 'Types & guards',
    entries: [
      { slug: 'type-guards', name: 'Type guards', description: 'isSignal / isReadonlySignal.' },
      { slug: 'types', name: 'Types', description: 'Signal, ReadonlySignal, ReadValue, DeepReadonly.' },
    ],
  },
]

export const reactivityDocEntries = reactivityDocCategories.flatMap((c) => c.entries)

export const reactivityDocEntryBySlug = (slug: string): ReactivityDocEntry | undefined =>
  reactivityDocEntries.find((e) => e.slug === slug)
