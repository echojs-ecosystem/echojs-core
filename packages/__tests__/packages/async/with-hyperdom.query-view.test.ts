// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createQuery, createQueryProvider } from '@echojs-ecosystem/async'
import { createModel, createView, h, render, Show } from '@echojs-ecosystem/hyperdom'

import { resetAsyncTestContext } from '../../shared/test-utils/async'
import { flushUntil } from '../../shared/test-utils/flush'

type UserRow = { id: string; name: string }

type UsersListModel = {
  state: {
    isPending: () => boolean
    items: () => string[]
  }
}

const usersQuery = createQuery<UserRow[], void>({
  queryKey: () => ['package-tests', 'hyperdom', 'users'],
  queryFn: async () => [{ id: '1', name: 'Ada' }],
})

describe('async × hyperdom: query in createModel + Show', () => {
  beforeEach(() => {
    createQueryProvider()
  })

  afterEach(() => {
    resetAsyncTestContext()
  })

  it('renders loading then data through createModel and Show', async () => {
    const listModel = createModel(
      (): UsersListModel => {
        const list = usersQuery.with()

        return {
          state: {
            isPending: () => list.isPending(),
            items: () => list.data()?.map((user) => user.name) ?? [],
          },
        }
      },
      { name: 'UsersListModel', structExports: true },
    )

    const UsersListView = createView<UsersListModel>(
      (vm) =>
        h('div', { 'data-testid': 'root' }, [
          Show(
            () => vm.state.isPending(),
            () => h('p', { 'data-testid': 'loading' }, 'loading'),
            () =>
              h(
                'ul',
                { 'data-testid': 'list' },
                vm.state.items().map((name) => h('li', { 'data-testid': 'item' }, name)),
              ),
          ),
        ]),
      'UsersListView',
    )

    const container = document.createElement('div')
    const dispose = render(UsersListView(listModel()), container)

    await flushUntil(() => container.querySelector('[data-testid="list"]') != null)

    const items = container.querySelectorAll('[data-testid="item"]')
    expect(items).toHaveLength(1)
    expect(items[0]?.textContent).toBe('Ada')
    expect(container.querySelector('[data-testid="loading"]')).toBeNull()

    dispose()
  })
})
