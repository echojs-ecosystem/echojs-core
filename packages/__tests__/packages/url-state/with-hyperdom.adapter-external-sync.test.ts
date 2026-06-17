// @vitest-environment jsdom
import { createView, h, render } from '@echojs-ecosystem/hyperdom'
import {
  createMemoryUrlStateAdapter,
  createQueryParams,
  parseAsInteger,
  parseAsString,
} from '@echojs-ecosystem/url-state'
import { describe, expect, it } from 'vitest'

import { flush } from '../../shared/test-utils/flush'

type FiltersViewModel = {
  state: {
    q: () => string
    page: () => number
  }
}

describe('url-state × hyperdom: external adapter sync', () => {
  it('syncs view when adapter search changes outside filters.set', async () => {
    const adapter = createMemoryUrlStateAdapter('?q=phone&page=1')
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(''),
        page: parseAsInteger.withDefault(1),
      },
      { adapter, history: 'replace' },
    )

    const FiltersView = createView<FiltersViewModel>(
      (vm) =>
        h('div', null, [
          h('span', { 'data-testid': 'q' }, () => vm.state.q()),
          h('span', { 'data-testid': 'page' }, () => String(vm.state.page())),
        ]),
      'FiltersView',
    )

    const vm: FiltersViewModel = {
      state: {
        q: () => filters.value().q,
        page: () => filters.value().page,
      },
    }

    const container = document.createElement('div')
    const dispose = render(FiltersView(vm), container)

    expect(container.querySelector('[data-testid="q"]')?.textContent).toBe('phone')

    adapter.setSearch('?q=lamp&page=2')
    await flush()

    expect(container.querySelector('[data-testid="q"]')?.textContent).toBe('lamp')
    expect(container.querySelector('[data-testid="page"]')?.textContent).toBe('2')

    dispose()
  })

  it('reset() restores defaults in view-bound filters', async () => {
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(''),
        page: parseAsInteger.withDefault(1),
      },
      {
        adapter: createMemoryUrlStateAdapter('?q=bike&page=3'),
        history: 'replace',
      },
    )

    const FiltersView = createView<FiltersViewModel>(
      (vm) =>
        h('span', { 'data-testid': 'q' }, () => vm.state.q()),
      'FiltersView',
    )

    const vm: FiltersViewModel = {
      state: {
        q: () => filters.value().q,
        page: () => filters.value().page,
      },
    }

    const container = document.createElement('div')
    const dispose = render(FiltersView(vm), container)

    expect(container.querySelector('[data-testid="q"]')?.textContent).toBe('bike')

    filters.reset()
    await flush()

    expect(container.querySelector('[data-testid="q"]')?.textContent).toBe('')
    expect(filters.value().page).toBe(1)

    dispose()
  })
})
