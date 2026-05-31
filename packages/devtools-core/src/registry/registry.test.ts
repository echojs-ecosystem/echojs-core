import { describe, expect, it, beforeEach } from 'vitest'

import {
  __resetDevtoolsCoreForTests,
  getAllSnapshots,
  getNodeSnapshot,
  registerDevtoolsNode,
  unregisterDevtoolsNode,
} from '../index'
import { resetDevtoolsIds } from '../utils/id'

describe('DevtoolsRegistry', () => {
  beforeEach(() => {
    __resetDevtoolsCoreForTests()
    resetDevtoolsIds()
  })

  it('registers a node with auto id', () => {
    const node = registerDevtoolsNode({ type: 'store', name: 'authStore' })
    expect(node.unregister).toBeTypeOf('function')
  })

  it('returns snapshot from getSnapshot', () => {
    registerDevtoolsNode({
      id: 'store_auth',
      type: 'store',
      getSnapshot: () => ({ value: 42 }),
    })

    expect(getNodeSnapshot('store_auth')).toMatchObject({
      id: 'store_auth',
      type: 'store',
      state: { value: 42 },
    })
  })

  it('unregisters node', () => {
    registerDevtoolsNode({
      id: 'query_1',
      type: 'query',
      getSnapshot: () => ({ status: 'pending' }),
    })

    expect(unregisterDevtoolsNode('query_1')).toBe(true)
    expect(getNodeSnapshot('query_1')).toBeUndefined()
  })

  it('lists multiple node snapshots', () => {
    registerDevtoolsNode({
      id: 'store_a',
      type: 'store',
      getSnapshot: () => ({ value: 'a' }),
    })
    registerDevtoolsNode({
      id: 'router_main',
      type: 'router',
      getSnapshot: () => ({ path: '/' }),
    })

    const snapshots = getAllSnapshots()
    expect(snapshots).toHaveLength(2)
    expect(snapshots.map((s) => s.id).sort()).toEqual(['router_main', 'store_a'])
  })

  it('throws on duplicate id', () => {
    registerDevtoolsNode({ id: 'dup', type: 'custom' })
    expect(() => registerDevtoolsNode({ id: 'dup', type: 'custom' })).toThrow(/already registered/)
  })
})
