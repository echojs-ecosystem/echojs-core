import { describe, expect, it, vi } from 'vitest'
import { signal } from '@echojs-ecosystem/reactivity'

import { h } from '../../h'
import { render } from '../../render'
import { Match, P } from './index'

type Status =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error }

describe('Match().When().Otherwise()', () => {
  it('renders the first matching branch', () => {
    const container = document.createElement('div')
    const state = signal<Status>({ status: 'loading' })

    render(
      Match(() => state.value())
        .When({ status: 'loading' }, () => h('div', null, 'Loading'))
        .When({ status: 'success' }, (s) => h('div', null, s.data))
        .Otherwise(() => h('div', null, 'Other')),
      container,
    )

    expect(container.textContent).toBe('Loading')
  })

  it('updates reactively when the matched branch changes', async () => {
    const container = document.createElement('div')
    const state = signal<Status>({ status: 'idle' })

    render(
      Match(() => state.value())
        .When({ status: 'idle' }, () => h('div', null, 'Idle'))
        .When({ status: 'success' }, (s) => h('div', null, s.data))
        .Otherwise(() => h('div', null, 'Fallback')),
      container,
    )

    expect(container.textContent).toBe('Idle')

    state.set({ status: 'success', data: 'Done' })
    await Promise.resolve()
    expect(container.textContent).toBe('Done')
  })

  it('uses Otherwise when nothing matches', () => {
    const container = document.createElement('div')
    const state = signal<Status>({ status: 'error', error: new Error('boom') })

    render(
      Match(() => state.value())
        .When({ status: 'idle' }, () => h('div', null, 'Idle'))
        .Otherwise(() => h('div', null, 'Fallback')),
      container,
    )

    expect(container.textContent).toBe('Fallback')
  })

  it('chains multiple When before Otherwise', async () => {
    const container = document.createElement('div')
    const state = signal<'a' | 'b'>('a')

    render(
      Match(() => state.value())
        .When('a', () => h('span', null, 'A'))
        .When('b', () => h('span', null, 'B'))
        .Otherwise(() => null),
      container,
    )

    expect(container.textContent).toBe('A')

    state.set('b')
    await Promise.resolve()
    expect(container.textContent).toBe('B')
  })

  it('picks the first matching When in declaration order', () => {
    const container = document.createElement('div')

    render(
      Match(() => 'same' as string)
        .When(P.string, () => h('div', null, 'first'))
        .When(P._, () => h('div', null, 'second'))
        .Otherwise(() => h('div', null, 'fallback')),
      container,
    )

    expect(container.textContent).toBe('first')
  })

  it('supports predicate When branches', () => {
    const container = document.createElement('div')

    render(
      Match(() => 7)
        .When((n) => n % 2 === 0, () => h('div', null, 'even'))
        .When((n) => n % 2 === 1, () => h('div', null, 'odd'))
        .Otherwise(() => null),
      container,
    )

    expect(container.textContent).toBe('odd')
  })

  it('narrows struct patterns on union state', () => {
    const container = document.createElement('div')
    const err = new Error('boom')

    render(
      Match(() => ({ status: 'error', error: err }) as Status)
        .When({ status: 'error' }, (s) => h('div', null, s.error.message))
        .Otherwise(() => h('div', null, 'ok')),
      container,
    )

    expect(container.textContent).toBe('boom')
  })
})

describe('Match().Render()', () => {
  it('returns null when no branch matches', () => {
    const container = document.createElement('div')
    const state = signal<Status>({ status: 'error', error: new Error('x') })

    render(
      Match(() => state.value())
        .When({ status: 'idle' }, () => h('div', null, 'Idle'))
        .Render(),
      container,
    )

    expect(container.textContent).toBe('')
  })

  it('updates reactively without Otherwise', async () => {
    const container = document.createElement('div')
    const state = signal<Status>({ status: 'loading' })

    render(
      Match(() => state.value())
        .When({ status: 'loading' }, () => h('div', null, 'Loading'))
        .When({ status: 'success' }, (s) => h('div', null, s.data))
        .Render(),
      container,
    )

    expect(container.textContent).toBe('Loading')

    state.set({ status: 'success', data: 'Ready' })
    await Promise.resolve()
    expect(container.textContent).toBe('Ready')

    state.set({ status: 'error', error: new Error('fail') })
    await Promise.resolve()
    expect(container.textContent).toBe('')
  })
})

describe('Match — sources', () => {
  it('accepts a signal-like source', async () => {
    const container = document.createElement('div')
    const state = signal<'on' | 'off'>('on')

    render(
      Match(state)
        .When('on', () => h('div', null, 'ON'))
        .When('off', () => h('div', null, 'OFF'))
        .Otherwise(() => null),
      container,
    )

    expect(container.textContent).toBe('ON')

    state.set('off')
    await Promise.resolve()
    expect(container.textContent).toBe('OFF')
  })

  it('re-runs render when getter dependencies change', async () => {
    const container = document.createElement('div')
    const label = signal('first')
    const renderBranch = vi.fn(() => h('div', null, label.value()))

    render(
      Match(() => label.value())
        .When(P.string, renderBranch)
        .Otherwise(() => null),
      container,
    )

    expect(renderBranch).toHaveBeenCalled()
    const callsBefore = renderBranch.mock.calls.length

    label.set('second')
    await Promise.resolve()

    expect(renderBranch.mock.calls.length).toBeGreaterThan(callsBefore)
    expect(container.textContent).toBe('second')
  })
})

describe('Match — DOM integration', () => {
  it('does not disturb sibling nodes when branch changes', async () => {
    const container = document.createElement('div')
    const state = signal<Status>({ status: 'idle' })

    render(
      h('div', null, [
        h('span', { id: 'left' }, 'L'),
        Match(() => state.value())
          .When({ status: 'idle' }, () => h('span', { id: 'mid' }, 'idle'))
          .When({ status: 'loading' }, () => h('span', { id: 'mid' }, 'loading'))
          .Otherwise(() => null),
        h('span', { id: 'right' }, 'R'),
      ]),
      container,
    )

    const root = container.firstElementChild as HTMLDivElement
    expect(root.querySelector('#left')?.textContent).toBe('L')
    expect(root.querySelector('#mid')?.textContent).toBe('idle')
    expect(root.querySelector('#right')?.textContent).toBe('R')

    state.set({ status: 'loading' })
    await Promise.resolve()

    expect(root.querySelector('#left')?.textContent).toBe('L')
    expect(root.querySelector('#mid')?.textContent).toBe('loading')
    expect(root.querySelector('#right')?.textContent).toBe('R')
  })
})
