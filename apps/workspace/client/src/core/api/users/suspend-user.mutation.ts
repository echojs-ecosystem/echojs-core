import { createMutation } from '@echojs-ecosystem/async'
import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { invalidateUsers } from '../invalidate'
import { apiPaths } from '../paths'

const suspendUser = (id: string, signal?: AbortSignal) =>
  httpClient.post(apiPaths.userSuspend(id), { signal }).unwrapJson<{ user: AdminUser }>()

export const suspendUserMutation = createMutation<{ user: AdminUser }, { id: string }>({
  name: 'suspend-user',
  mutationFn: ({ variables, signal }) => suspendUser(variables.id, signal),
  onSuccess: invalidateUsers,
})
