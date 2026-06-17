// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { createPermission, createPermissionCheck } from '@echojs-ecosystem/permission'
import { h, render } from '@echojs-ecosystem/hyperdom'

import { flush } from '../../shared/test-utils/flush'

type Schema = {
  order: [{ name: 'delete'; type: { id: string } }]
}

describe('permission × hyperdom: createPermissionCheck + Show', () => {
  it('toggles action region when permission setup changes', async () => {
    const permission = createPermission<Schema>()
    const PermissionCheck = createPermissionCheck(permission)

    const container = document.createElement('div')
    const dispose = render(
      PermissionCheck(
        'order.delete',
        { id: 'ord_1' },
        () => h('button', { 'data-testid': 'delete' }, 'Delete'),
        () => h('span', { 'data-testid': 'denied' }, 'Denied'),
      ),
      container,
    )

    expect(container.querySelector('[data-testid="delete"]')).toBeNull()
    expect(container.querySelector('[data-testid="denied"]')).not.toBeNull()

    permission.setup({
      order: {
        delete: (subject: { id: string }) => subject.id === 'ord_1',
      },
    })
    await flush()

    expect(container.querySelector('[data-testid="delete"]')).not.toBeNull()
    expect(container.querySelector('[data-testid="denied"]')).toBeNull()

    dispose()
  })
})
