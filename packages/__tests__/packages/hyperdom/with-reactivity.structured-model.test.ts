// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import {
  createComponent,
  createModel,
  createView,
  h,
  mount,
} from '@echojs-ecosystem/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

type CounterModel = {
  state: {
    count: () => number
    doubled: () => number
  }
  functions: {
    increment: () => void
  }
}

describe('hyperdom × reactivity: structured createModel + createComponent', () => {
  it('renders VM sections from model factory and updates reactively', async () => {
    const $count = signal(0)

    const counterModel = createModel(
      (): CounterModel => ({
        state: {
          count: () => $count.value(),
          doubled: () => $count.value() * 2,
        },
        functions: {
          increment: () => {
            $count.set($count.value() + 1)
          },
        },
      }),
      { name: 'CounterModel', structExports: true },
    )

    const CounterView = createView<CounterModel>(
      (vm) =>
        h('div', null, [
          h('span', { 'data-testid': 'count' }, () => String(vm.state.count())),
          h('span', { 'data-testid': 'doubled' }, () => String(vm.state.doubled())),
          h('button', { type: 'button', onClick: vm.functions.increment }, '+'),
        ]),
      'CounterView',
    )

    const Counter = createComponent(counterModel, CounterView)
    const { node, dispose } = mount(Counter(), { className: 'counter' })

    expect(node.querySelector('[data-testid="count"]')?.textContent).toBe('0')
    expect(node.querySelector('[data-testid="doubled"]')?.textContent).toBe('0')

    ;(node.querySelector('button') as HTMLButtonElement).click()
    await Promise.resolve()

    expect(node.querySelector('[data-testid="count"]')?.textContent).toBe('1')
    expect(node.querySelector('[data-testid="doubled"]')?.textContent).toBe('2')

    dispose()
  })
})
