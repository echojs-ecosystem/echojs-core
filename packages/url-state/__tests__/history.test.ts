import { describe, expect, it } from 'vitest'

import type { UrlStateAdapter } from '@echojs/url-state'
import { createQueryParam, parseAsInteger } from '@echojs/url-state'

const flush = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('history options', () => {
  it('default history is replace', async () => {
    const calls: Array<'replace' | 'push' | undefined> = []
    let search = ''
    const adapter: UrlStateAdapter = {
      kind: 'test',
      getSearch: () => search,
      setSearch: (next, opts) => {
        search = next
        calls.push(opts?.history)
      },
      subscribe: () => () => {},
    }

    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    page.set(2)
    await flush()
    expect(calls).toEqual(['replace'])
  })

  it('call-level push overrides create-level replace', async () => {
    const calls: Array<'replace' | 'push' | undefined> = []
    let search = ''
    const adapter: UrlStateAdapter = {
      kind: 'test',
      getSearch: () => search,
      setSearch: (next, opts) => {
        search = next
        calls.push(opts?.history)
      },
      subscribe: () => () => {},
    }

    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
      history: 'replace',
    })
    page.set(2, { history: 'push' })
    await flush()
    expect(calls).toEqual(['push'])
  })
})
