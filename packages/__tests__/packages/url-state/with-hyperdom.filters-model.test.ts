// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { createModel, createView, h, render } from '@echojs-ecosystem/hyperdom'
import {
  createMemoryUrlStateAdapter,
  createQueryParams,
  parseAsInteger,
  parseAsString,
} from '@echojs-ecosystem/url-state'

import { flush } from '../../shared/test-utils/flush'

const listFilters = (search = '') =>
  createQueryParams(
    {
      q: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    {
      adapter: createMemoryUrlStateAdapter(search),
      shallow: true,
      history: 'replace',
    },
  )

type ListFiltersModel = {
  state: {
    q: () => string
    page: () => number
  }
  functions: {
    setQ: (value: string) => void
    nextPage: () => void
  }
}

describe('url-state × hyperdom: filters in structured model + view', () => {
  it('keeps search input DOM node when page filter changes via model', async () => {
    const filters = listFilters()

    const listModel = createModel(
      (): ListFiltersModel => ({
        state: {
          q: () => filters.value().q,
          page: () => filters.value().page,
        },
        functions: {
          setQ: (value: string) => filters.set({ q: value, page: 1 }),
          nextPage: () => filters.set({ page: filters.value().page + 1 }),
        },
      }),
      { name: 'ListModel', structExports: true },
    )

    const ListFiltersView = createView<ListFiltersModel>(
      (vm) =>
        h('div', null, [
          h('input', {
            'data-testid': 'search',
            value: () => vm.state.q(),
            onInput: (event: Event) => {
              const target = event.currentTarget as HTMLInputElement
              vm.functions.setQ(target.value)
            },
          }),
          h('button', {
            type: 'button',
            'data-testid': 'next-page',
            onClick: vm.functions.nextPage,
          }),
        ]),
      'ListFiltersView',
    )

    const container = document.createElement('div')
    const dispose = render(ListFiltersView(listModel()), container)

    const input = container.querySelector('[data-testid="search"]') as HTMLInputElement
    const nextPage = container.querySelector('[data-testid="next-page"]') as HTMLButtonElement

    nextPage.click()
    await flush()

    expect(container.querySelector('[data-testid="search"]')).toBe(input)
    expect(listModel().state.page()).toBe(2)

    dispose()
  })
})
