import { describe, expect, it, vi } from 'vitest'

import {
  abortWithReason,
  createFetchAbortHandle,
  mergeFetchAbortSource,
  resolveAbortInput,
} from './abort-control'

describe('abort-control', () => {
  it('creates owned controller by default', () => {
    const handle = createFetchAbortHandle()
    expect(handle.ownsController).toBe(true)
    expect(handle.signal.aborted).toBe(false)
    handle.dispose()
  })

  it('uses external AbortController without taking ownership', () => {
    const external = new AbortController()
    const handle = createFetchAbortHandle({ abortController: external })
    expect(handle.controller).toBe(external)
    expect(handle.ownsController).toBe(false)
    handle.abort('stop')
    expect(external.signal.aborted).toBe(true)
    expect(external.signal.reason).toBe('stop')
  })

  it('links external AbortSignal to internal controller', () => {
    const external = new AbortController()
    const handle = createFetchAbortHandle({ signal: external.signal })
    expect(handle.ownsController).toBe(true)
    external.abort('linked')
    expect(handle.signal.aborted).toBe(true)
    expect(handle.signal.reason).toBe('linked')
  })

  it('combines external controller and signal', () => {
    const controller = new AbortController()
    const other = new AbortController()
    const handle = createFetchAbortHandle({
      abortController: controller,
      signal: other.signal,
    })
    other.abort('combo')
    expect(controller.signal.aborted).toBe(true)
    expect(handle.signal.aborted).toBe(true)
  })

  it('resolveAbortInput supports factory', () => {
    const ac = new AbortController()
    expect(resolveAbortInput(() => ac)).toBe(ac)
  })

  it('mergeFetchAbortSource last source wins', () => {
    const a = new AbortController()
    const b = new AbortController()
    expect(
      mergeFetchAbortSource({ abortController: a }, { abortController: b }).abortController,
    ).toBe(b)
  })

  it('abortWithReason is idempotent', () => {
    const ac = new AbortController()
    abortWithReason(ac, 'once')
    abortWithReason(ac, 'twice')
    expect(ac.signal.reason).toBe('once')
  })

  it('dispose unlinks external signal listeners', () => {
    const external = new AbortController()
    const handle = createFetchAbortHandle({ signal: external.signal })
    handle.dispose()
    external.abort('after-dispose')
    expect(handle.signal.aborted).toBe(false)
  })

  it('factory abortController is resolved per handle', () => {
    const factory = vi.fn(() => new AbortController())
    createFetchAbortHandle({ abortController: factory })
    createFetchAbortHandle({ abortController: factory })
    expect(factory).toHaveBeenCalledTimes(2)
  })
})
