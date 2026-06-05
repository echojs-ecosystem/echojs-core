import { describe, expect, it, beforeEach } from 'vitest'

import {
  DEVTOOLS_GLOBAL_HOOK_KEY,
  __resetDevtoolsCoreForTests,
  getDevtoolsBridge,
  getOrCreateDevtoolsBridge,
  registerDevtoolsNode,
} from '../index'

describe('Devtools bridge', () => {
  beforeEach(() => {
    __resetDevtoolsCoreForTests()
  })

  it('creates a singleton bridge on globalThis', () => {
    const a = getOrCreateDevtoolsBridge()
    const b = getOrCreateDevtoolsBridge()
    expect(a).toBe(b)
    expect(globalThis[DEVTOOLS_GLOBAL_HOOK_KEY]).toBe(a)
  })

  it('reuses existing global hook', () => {
    const external = getOrCreateDevtoolsBridge()
    registerDevtoolsNode({ id: 'from_bridge', type: 'store' })

    const bridge = getDevtoolsBridge()
    expect(bridge).toBe(external)
    expect(bridge?.registry.get('from_bridge')?.id).toBe('from_bridge')
  })
})
