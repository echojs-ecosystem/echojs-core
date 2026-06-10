import { describe, expectTypeOf, it } from 'vitest'

import { h } from '../../h'
import type { Child } from '../../types'
import { Match, P } from './index'

type Status =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error }

describe('Match inference', () => {
  it('infers union type from a getter without explicit generics', () => {
    const state = (): Status => ({ status: 'success', data: 'ok' })

    Match(state)
      .When({ status: 'success' }, (s) => {
        expectTypeOf(s).toEqualTypeOf<{ status: 'success'; data: string }>()
        return h('div', null, s.data)
      })
      .Otherwise(() => null)
  })

  it('narrows discriminated union members from struct patterns', () => {
    Match(() => ({ status: 'error', error: new Error('x') }) as Status)
      .When({ status: 'error' }, (s) => {
        expectTypeOf(s).toEqualTypeOf<{ status: 'error'; error: Error }>()
        return h('div', null, s.error.message)
      })
      .Otherwise(() => null)
  })

  it('narrows inline type-guard patterns', () => {
    Match(() => ({ status: 'success', data: 'ok' }) as Status)
      .When(
        (s): s is Extract<Status, { status: 'success' }> => s.status === 'success',
        (s) => {
          expectTypeOf(s).toEqualTypeOf<{ status: 'success'; data: string }>()
          return h('div', null, s.data)
        },
      )
      .Otherwise(() => null)
  })

  it('Otherwise and Render return reactive child factories', () => {
    const fromOtherwise = Match(() => ({ status: 'idle' }) as Status)
      .When({ status: 'idle' }, () => h('div', null, 'idle'))
      .Otherwise(() => null)

    const fromRender = Match(() => ({ status: 'idle' }) as Status)
      .When({ status: 'loading' }, () => h('div', null, 'loading'))
      .Render()

    expectTypeOf(fromOtherwise).toEqualTypeOf<() => Child>()
    expectTypeOf(fromRender).toEqualTypeOf<() => Child>()
  })

  it('accepts type patterns for primitives', () => {
    Match(() => 'label' as string)
      .When(P.string, (value) => {
        expectTypeOf(value).toEqualTypeOf<string>()
        return h('span', null, value)
      })
      .Otherwise(() => null)
  })
})
