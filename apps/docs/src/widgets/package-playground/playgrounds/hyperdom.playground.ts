import { Show, button, div, p } from '@echojs-ecosystem/framework/hyperdom'
import { effect, signal } from '@echojs-ecosystem/framework/reactivity'

import type { PackagePlaygroundDef, PlaygroundInstance } from '../types'
import { pg } from '../playground-ui'

const create = (): PlaygroundInstance => {
  const $n = signal(0)
  const $snapshot = signal<Record<string, unknown>>({
    n: 0,
    showPositive: false,
  })

  effect(() => {
    const n = $n.value()
    $snapshot.set({ n, showPositive: n > 0 })
  })

  return {
    $snapshot,
    view: () => {
      const n = $n.value()
      return div(null, [
        p(
          { class: pg.hint() },
          'Reactive children and Show — no full page reload.'
        ),
        div(
          {
            class: () =>
              [
                'rounded-lg border px-4 py-3 transition-colors',
                n > 0
                  ? 'border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-950/30'
                  : 'border-border/80 bg-surface',
              ].join(' '),
          },
          [
            p({ class: pg.metric() }, () => String(n)),
            Show(
              () => n > 0,
              () =>
                p(
                  {
                    class:
                      'mt-2 text-sm text-emerald-800 dark:text-emerald-200',
                  },
                  'Positive branch'
                )
            ),
          ]
        ),
        div({ class: pg.actions() }, [
          button(
            { class: pg.btnPrimary(), onClick: () => $n.update((x) => x + 1) },
            'Increment'
          ),
          button({ class: pg.btn(), onClick: () => $n.set(0) }, 'Reset'),
        ]),
      ])
    },
  }
}

export const hyperdomPlayground: PackagePlaygroundDef = {
  id: 'hyperdom',
  title: 'HyperDOM preview',
  hint: 'DOM updates from signal reads inside the view tree.',
  available: true,
  create,
}
