import { createProvider } from '@echojs-ecosystem/framework/app'
import { effect } from '@echojs-ecosystem/reactivity'

import { bootstrapQuery } from '@entities/api/index.js'
import { $currentRole } from '@entities/session/index.js'

import {
  applyRolePermissions,
  hydratePermissionFromBootstrap,
} from './permission-engine.js'

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
