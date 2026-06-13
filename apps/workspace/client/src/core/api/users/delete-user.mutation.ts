import { createMutation } from '@echojs-ecosystem/async'

import { httpClient } from '@core/http-client/index'

import { invalidateUsers } from '../invalidate'
import { apiPaths } from '../paths'

const deleteUser = (id: string, signal?: AbortSignal) =>
  httpClient.delete(apiPaths.user(id), { signal }).unwrapJson<{ ok: true }>()

export const deleteUserMutation = createMutation<{ ok: true }, { id: string }>({
  name: 'delete-user',
  mutationFn: ({ variables, signal }) => deleteUser(variables.id, signal),
  onSuccess: invalidateUsers,
})
