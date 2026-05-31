import { describe, expect, it, beforeEach } from 'vitest'

import {
  __resetDevtoolsCoreForTests,
  emitDevtoolsEvent,
  getAllSnapshots,
  getTimelineEvents,
  registerDevtoolsNode,
  setDevtoolsEnabled,
} from '../index'
import { createDevtoolsId, resetDevtoolsIds } from '../utils/id'

describe('devtools disable', () => {
  beforeEach(() => {
    __resetDevtoolsCoreForTests()
    resetDevtoolsIds()
    setDevtoolsEnabled(true)
  })

  it('no-ops register and emit when disabled', () => {
    setDevtoolsEnabled(false)

    registerDevtoolsNode({ id: 'ignored', type: 'store' })
    emitDevtoolsEvent({ source: 'store', type: 'changed' })

    expect(getAllSnapshots()).toEqual([])
    expect(getTimelineEvents()).toEqual([])
  })

  it('createDevtoolsId stays usable when disabled', () => {
    setDevtoolsEnabled(false)
    expect(createDevtoolsId('store')).toBe('store_1')
  })
})

describe('createDevtoolsId', () => {
  beforeEach(() => resetDevtoolsIds())

  it('generates unique sequential ids', () => {
    expect(createDevtoolsId('store')).toBe('store_1')
    expect(createDevtoolsId('store')).toBe('store_2')
    expect(createDevtoolsId('query')).toBe('query_1')
  })
})
