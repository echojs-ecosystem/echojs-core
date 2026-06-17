import { describe, expectTypeOf, it } from 'vitest'

import { createModel, isInModelContext } from './create-model'

describe('createModel types', () => {
  it('infers flat model factory return type', () => {
    const make = createModel(() => ({ count: 1 as const }), 'CounterModel')

    expectTypeOf<ReturnType<typeof make>>().toEqualTypeOf<{ count: 1 }>()
    expectTypeOf(isInModelContext).returns.toEqualTypeOf<boolean>()
  })

  it('infers structured model sections', () => {
    const make = createModel(
      () => ({
        state: {
          count: () => 0,
        },
        data: {
          LABEL: 'items' as const,
        },
        functions: {
          increment: () => {},
        },
      }),
      { name: 'CounterModel', structExports: true },
    )

    type VM = ReturnType<typeof make>

    type _AssertStructured = VM extends {
      state: { count: () => number }
      data: { LABEL: 'items' }
      functions: { increment: () => void }
    }
      ? true
      : never

    const _assertStructured: _AssertStructured = true

    const vm = make()
    expectTypeOf(vm.state.count).returns.toBeNumber()
    expectTypeOf(vm.data.LABEL).toEqualTypeOf<'items'>()
    expectTypeOf(vm.functions.increment).toBeFunction()
  })

  it('accepts optional sections in structured models', () => {
    createModel(
      () => ({
        state: { ready: () => true },
        form: { submit: () => {} },
      }),
      { name: 'FormModel', structExports: true },
    )
  })
})
