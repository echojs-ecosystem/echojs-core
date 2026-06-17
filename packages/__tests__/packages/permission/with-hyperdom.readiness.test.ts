// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { createPermission, createPermissionCheck } from '@echojs-ecosystem/permission'
import { h, render } from '@echojs-ecosystem/hyperdom'

import { flush } from '../../shared/test-utils/flush'

type Schema = {
  dashboard: ['view']
}

describe('permission × hyperdom: readiness edge cases', () => {
  it('shows fallback before setup when permission is not ready', () => {
    const permission = createPermission<Schema>()
    const PermissionCheck = createPermissionCheck(permission)

    const container = document.createElement('div')
    const dispose = render(
      PermissionCheck(
        'dashboard.view',
        () => h('span', { 'data-testid': 'allowed' }, 'Allowed'),
        () => h('span', { 'data-testid': 'denied' }, 'Denied'),
      ),
      container,
    )

    expect(container.querySelector('[data-testid="allowed"]')).toBeNull()
    expect(container.querySelector('[data-testid="denied"]')?.textContent).toBe('Denied')

    dispose()
  })

  it('revokes rendered content when setup changes to deny', async () => {
    const permission = createPermission<Schema>()
    permission.setup({ dashboard: { view: true } })

    const PermissionCheck = createPermissionCheck(permission)
    const container = document.createElement('div')

    const dispose = render(
      PermissionCheck(
        'dashboard.view',
        () => h('span', { 'data-testid': 'allowed' }, 'Allowed'),
        () => h('span', { 'data-testid': 'denied' }, 'Denied'),
      ),
      container,
    )

    expect(container.querySelector('[data-testid="allowed"]')).not.toBeNull()

    permission.setup({ dashboard: { view: false } })
    await flush()

    expect(container.querySelector('[data-testid="allowed"]')).toBeNull()
    expect(container.querySelector('[data-testid="denied"]')).not.toBeNull()

    dispose()
  })
})
