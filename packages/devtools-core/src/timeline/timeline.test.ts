import { describe, expect, it, beforeEach } from 'vitest'

import {
  __resetDevtoolsCoreForTests,
  emitDevtoolsEvent,
  getTimelineEvents,
  subscribeTimeline,
} from '../index'
import { DevtoolsTimeline } from './timeline'

describe('DevtoolsTimeline', () => {
  beforeEach(() => {
    __resetDevtoolsCoreForTests()
  })

  it('emits events with id and timestamp', () => {
    const event = emitDevtoolsEvent({
      source: 'store',
      type: 'changed',
      nodeId: 'store_1',
      payload: { value: 1 },
    })

    expect(event).toMatchObject({
      source: 'store',
      type: 'changed',
      nodeId: 'store_1',
      payload: { value: 1 },
    })
    expect(event?.id).toBeTruthy()
    expect(event?.timestamp).toBeTypeOf('number')
  })

  it('notifies subscribers', () => {
    const seen: string[] = []
    const unsub = subscribeTimeline((event) => {
      seen.push(event.type)
    })

    emitDevtoolsEvent({ source: 'query', type: 'fetch', nodeId: 'q1' })
    emitDevtoolsEvent({ source: 'mutation', type: 'run', nodeId: 'm1' })

    expect(seen).toEqual(['fetch', 'run'])
    unsub()
  })

  it('enforces max events FIFO', () => {
    const timeline = new DevtoolsTimeline()
    timeline.setMaxEvents(3)

    timeline.emit({ source: 'custom', type: 'e1' })
    timeline.emit({ source: 'custom', type: 'e2' })
    timeline.emit({ source: 'custom', type: 'e3' })
    timeline.emit({ source: 'custom', type: 'e4' })

    expect(timeline.getEvents().map((e) => e.type)).toEqual(['e2', 'e3', 'e4'])
  })

  it('exposes events via getTimelineEvents', () => {
    emitDevtoolsEvent({ source: 'router', type: 'navigate', payload: { to: '/home' } })
    expect(getTimelineEvents()).toHaveLength(1)
  })
})
