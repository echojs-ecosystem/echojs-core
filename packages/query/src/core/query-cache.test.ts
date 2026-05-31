import { describe, expect, it, vi } from 'vitest'

import { createTestClient, flush } from '../test-utils'
import { createQuery } from '../query/create-query'
import { resolveDefinitionOptions, resolveInstanceOptions } from '../query/query-status'

describe('QueryCache', () => {
  it('build returns same query for same key', async () => {
    const client = createTestClient()
    const def = createQuery({
      queryKey: () => ['dup'],
      queryFn: async () => 1,
    })

    await client.fetchQuery(def, {})
    const a = client.queryCache.getByKey(['dup'])
    const b = client.queryCache.build({
      client,
      cache: client.queryCache,
      definition: def,
      params: {} as void,
      queryKey: ['dup'],
      options: resolveInstanceOptions(resolveDefinitionOptions(def)),
    })
    expect(a).toBe(b)
  })

  it('findAll with empty filter returns all', async () => {
    const client = createTestClient()
    const q1 = createQuery({ queryKey: () => ['a'], queryFn: async () => 1 })
    const q2 = createQuery({ queryKey: () => ['b'], queryFn: async () => 2 })
    await client.fetchQuery(q1, {})
    await client.fetchQuery(q2, {})
    expect(client.queryCache.findAll([])).toHaveLength(2)
    expect(client.queryCache.findAll(['a'])).toHaveLength(1)
  })

  it('remove and clear', async () => {
    const client = createTestClient()
    const def = createQuery({ queryKey: () => ['rm'], queryFn: async () => 1 })
    await client.fetchQuery(def, {})
    const query = client.queryCache.getByKey(['rm'])!
    const events: string[] = []
    client.queryCache.subscribe((e) => events.push(e.type))
    client.queryCache.remove(query)
    expect(client.queryCache.getByKey(['rm'])).toBeUndefined()
    expect(events).toContain('queryRemoved')

    await client.fetchQuery(def, {})
    client.queryCache.clear()
    expect(client.queryCache.getAll()).toHaveLength(0)
  })

  it('find with object filter exact', async () => {
    const client = createTestClient()
    const def = createQuery({ queryKey: () => ['find'], queryFn: async () => 1 })
    await client.fetchQuery(def, {})
    const found = client.queryCache.find({ queryKey: ['find'], exact: true })
    expect(found?.queryKey).toEqual(['find'])
  })

  it('onFocus and onOnline delegate to queries', async () => {
    const client = createTestClient()
    const def = createQuery({
      queryKey: () => ['focus-delegate'],
      queryFn: async () => 1,
      staleTime: 0,
    })
    const instance = def.with({}, { client, refetchOnWindowFocus: true, refetchOnMount: false })
    await instance.refetch()
    await flush()
    const query = client.queryCache.getByKey(['focus-delegate'])!
    const spy = vi.spyOn(query, 'onFocus')
    client.queryCache.onFocus()
    expect(spy).toHaveBeenCalled()
  })
})
