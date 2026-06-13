import { createMutation } from '@echojs-ecosystem/async'
import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { invalidateUsers } from '../invalidate'
import { apiPaths } from '../paths'

const activateUser = (id: string, signal?: AbortSignal) =>
  httpClient.post(apiPaths.userActivate(id), { signal }).unwrapJson<{ user: AdminUser }>()

export const activateUserMutation = createMutation<{ user: AdminUser }, { id: string }>({
  name: 'activate-user',
  mutationFn: ({ variables, signal }) => activateUser(variables.id, signal),
  onSuccess: invalidateUsers,
})
