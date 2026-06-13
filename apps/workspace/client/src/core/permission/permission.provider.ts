import { createProvider } from '@echojs-ecosystem/framework/app'
import { effect } from '@echojs-ecosystem/reactivity'

import { bootstrapQuery } from '@core/api/index'
import { $currentRole } from '@entities/session/index'

import {
  applyRolePermissions,
  hydratePermissionFromBootstrap,
} from './permission.helpers'

export const permissionProvider = createProvider({
  name: 'permission',
  setup() {
    applyRolePermissions($currentRole.peek())

    effect(() => {
      const role = $currentRole.value()
      applyRolePermissions(role)

      void bootstrapQuery
        .with({ role })
        .refetch()
        .then((payload) => {
          if (payload) hydratePermissionFromBootstrap(payload)
        })
        .catch(() => {
          applyRolePermissions(role)
        })
    })
  },
})
