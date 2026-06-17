// @vitest-environment jsdom
import { computed } from '@echojs-ecosystem/reactivity'
import { h, render } from '@echojs-ecosystem/hyperdom'
import {
  createMemoryUrlStateAdapter,
  createQueryParams,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
} from '@echojs-ecosystem/url-state'
import { describe, expect, it } from 'vitest'

import { createMountTracker } from '../../shared/test-utils/mount-tracker'
import { flush } from '../../shared/test-utils/flush'

const ordersLikeSchema = {
  q: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  status: parseAsLiteral(['all', 'pending', 'paid'] as const).withDefault('all'),
}

const createOrdersLikeFilters = (search = '') =>
  createQueryParams(ordersLikeSchema, {
    adapter: createMemoryUrlStateAdapter(search),
    history: 'replace',
  })

const createListData = (filters: ReturnType<typeof createOrdersLikeFilters>) =>
  computed(() => {
    const f = filters.value()
    return { total: f.q.length + f.page, q: f.q, status: f.status }
  })

describe('url-state × hyperdom: DOM stability edge cases', () => {
  it('anti-pattern remounts search input when unrelated filter changes', async () => {
    const filters = createOrdersLikeFilters()
    const listData = createListData(filters)
    const container = document.createElement('div')
    const { mountCounts, nodes, track } = createMountTracker()

    render(
      () => {
        const snapshot = filters.value()
        const response = listData.value()

        return h('div', null, [
          h('input', {
            'data-testid': 'search',
            ref: track('search'),
            value: snapshot.q,
          }),
          h('span', { 'data-testid': 'total' }, String(response.total)),
        ])
      },
      container,
    )
    await flush()

    const searchBefore = nodes.get('search')
    filters.set({ status: 'paid', page: 1 })
    await flush()

    expect(nodes.get('search')).not.toBe(searchBefore)
    expect(mountCounts.get('search')).toBe(2)
  })

  it('structured view keeps search DOM when unrelated param changes', async () => {
    const filters = createOrdersLikeFilters()
    const listData = createListData(filters)
    const container = document.createElement('div')
    const { mountCounts, nodes, track } = createMountTracker()

    render(
      () =>
        h('div', null, [
          h('input', {
            'data-testid': 'search',
            ref: track('search'),
            value: () => filters.value().q,
          }),
          () => {
            const response = listData.value()
            return h('table', { 'data-testid': 'table', ref: track('table') }, String(response.total))
          },
        ]),
      container,
    )
    await flush()

    const searchBefore = nodes.get('search')
    const tableBefore = nodes.get('table')

    filters.set({ status: 'paid', page: 1 })
    await flush()

    expect(nodes.get('search')).toBe(searchBefore)
    expect(mountCounts.get('search')).toBe(1)
    expect(nodes.get('table')).not.toBe(tableBefore)
    expect(mountCounts.get('table')).toBe(2)
  })

  it('structured view preserves search input while q changes incrementally', async () => {
    const filters = createOrdersLikeFilters()
    const listData = createListData(filters)
    const container = document.createElement('div')
    const { mountCounts, nodes, track } = createMountTracker()

    render(
      () =>
        h('div', null, [
          h('input', {
            'data-testid': 'search',
            ref: track('search'),
            value: () => filters.value().q,
          }),
          () => {
            const response = listData.value()
            return h('span', { 'data-testid': 'total' }, String(response.total))
          },
        ]),
      container,
    )
    await flush()

    const search = nodes.get('search') as HTMLInputElement

    filters.set({ q: 'e', page: 1 })
    await flush()
    expect(nodes.get('search')).toBe(search)
    expect(search.value).toBe('e')
    expect(mountCounts.get('search')).toBe(1)

    filters.set({ q: 'echo', page: 1 })
    await flush()
    expect(nodes.get('search')).toBe(search)
    expect(search.value).toBe('echo')
    expect(mountCounts.get('search')).toBe(1)
  })
})
