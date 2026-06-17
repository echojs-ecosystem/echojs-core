// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createQuery, createQueryProvider } from '@echojs-ecosystem/async'
import { createModel, createView, h, render, Show } from '@echojs-ecosystem/hyperdom'

import { resetAsyncTestContext } from '../../shared/test-utils/async'
import { flush, flushUntil } from '../../shared/test-utils/flush'

type ErrorViewModel = {
  state: {
    isError: () => boolean
    isSuccess: () => boolean
    message: () => string
  }
  functions: {
    retry: () => Promise<unknown>
  }
}

describe('async × hyperdom: query error and refetch', () => {
  let shouldFail = true

  beforeEach(() => {
    shouldFail = true
    createQueryProvider()
  })

  afterEach(() => {
    resetAsyncTestContext()
  })

  it('shows error region then recovers after manual refetch', async () => {
    const statusQuery = createQuery<string, void>({
      queryKey: () => ['package-tests', 'async', 'error-refetch'],
      queryFn: async () => {
        if (shouldFail) throw new Error('network down')
        return 'ok'
      },
      retry: false,
    })

    const statusModel = createModel(
      (): ErrorViewModel => {
        const status = statusQuery.with(undefined as void, { enabled: false })

        return {
          state: {
            isError: () => status.isError(),
            isSuccess: () => status.isSuccess(),
            message: () => status.data() ?? status.error()?.message ?? '',
          },
          functions: {
            retry: () => status.refetch(),
          },
        }
      },
      { name: 'StatusModel', structExports: true },
    )

    const StatusView = createView<ErrorViewModel>(
      (vm) =>
        h('div', { 'data-testid': 'root' }, [
          Show(
            () => vm.state.isError(),
            () => h('p', { 'data-testid': 'error' }, () => vm.state.message()),
            () =>
              Show(
                () => vm.state.isSuccess(),
                () => h('p', { 'data-testid': 'ok' }, () => vm.state.message()),
                () => h('p', { 'data-testid': 'loading' }, 'loading'),
              ),
          ),
        ]),
      'StatusView',
    )

    const container = document.createElement('div')
    const vm = statusModel()
    const dispose = render(StatusView(vm), container)

    try {
      await vm.functions.retry()
    } catch {
      // expected failure
    }
    await flushUntil(() => container.querySelector('[data-testid="error"]') != null)
    expect(container.querySelector('[data-testid="error"]')?.textContent).toContain('network down')

    shouldFail = false
    await vm.functions.retry()
    await flushUntil(() => container.querySelector('[data-testid="ok"]') != null)

    expect(container.querySelector('[data-testid="ok"]')?.textContent).toBe('ok')
    expect(container.querySelector('[data-testid="error"]')).toBeNull()

    dispose()
  })
})
