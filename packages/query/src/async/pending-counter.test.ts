import { describe, expect, it } from 'vitest'

import { signal } from '@echojs-ecosystem/reactivity'

import { decrementPending, incrementPending, resetPending } from './pending-counter'

describe('pending-counter', () => {
  it('incrementPending and decrementPending', () => {
    const $n = signal(0)
    incrementPending($n)
    incrementPending($n)
    expect($n.peek()).toBe(2)
    decrementPending($n)
    expect($n.peek()).toBe(1)
    decrementPending($n)
    decrementPending($n)
    expect($n.peek()).toBe(0)
  })

  it('resetPending sets zero', () => {
    const $n = signal(5)
    resetPending($n)
    expect($n.peek()).toBe(0)
  })
})
