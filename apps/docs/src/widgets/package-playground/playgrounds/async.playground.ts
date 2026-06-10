import { button, div, p } from '@echojs-ecosystem/framework/hyperdom'
import { createQuery } from '@echojs-ecosystem/framework/async'
import { effect, signal } from '@echojs-ecosystem/framework/reactivity'

import type { PackagePlaygroundDef, PlaygroundInstance } from '../types'
import { pg } from '../playground-ui'

const delay = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(t)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })

const userQuery = createQuery<{ id: number; name: string }, { id: number }>({
  name: 'pg-user',
  queryKey: ({ id }) => ['playground-user', id] as const,
  queryFn: async ({ params, signal }) => {
    await delay(600, signal)
    return { id: params.id, name: `User #${params.id}` }
  },
  staleTime: 0,
})

const create = (): PlaygroundInstance => {
  const $userId = signal(1)
  const user = userQuery.with(() => ({ id: $userId.value() }))
  const $snapshot = signal<Record<string, unknown>>({})

  effect(() => {
    $snapshot.set({
      userId: $userId.value(),
      status: user.status(),
      fetchStatus: user.fetchStatus(),
      pending: user.isPending(),
      data: user.data() ?? null,
      error: user.error() ? String(user.error()) : null,
    })
  })

  return {
    $snapshot,
    view: () =>
      div(null, [
        p(
          { class: pg.hint() },
          'Uses the app QueryClient — ~600ms fake fetch per id.'
        ),
        p(
          { class: pg.row() },
          () => `status: ${user.status()} · fetching: ${user.isFetching()}`
        ),
        p({ class: pg.metric() }, () => user.data()?.name ?? '…'),
        div({ class: pg.actions() }, [
          button(
            {
              class: pg.btn(),
              onClick: () => $userId.update((id) => Math.max(1, id - 1)),
            },
            'Id −'
          ),
          button(
            {
              class: pg.btnPrimary(),
              onClick: () => $userId.update((id) => id + 1),
            },
            'Id +'
          ),
          button(
            { class: pg.btn(), onClick: () => void user.refetch() },
            'Refetch'
          ),
        ]),
      ]),
  }
}

export const asyncPlayground: PackagePlaygroundDef = {
  id: 'async',
  title: 'Async query instance',
  hint: 'Change id to abort previous fetch and load anew.',
  available: true,
  create,
}
