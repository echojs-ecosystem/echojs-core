import { createMutation, getQueryProvider } from '@echojs-ecosystem/async'
import type { AdminUser, UpdateUserInput } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { invalidateUsers } from '../invalidate'
import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

const updateUser = (id: string, input: UpdateUserInput, signal?: AbortSignal) =>
  httpClient.put(apiPaths.user(id), { json: input, signal }).unwrapJson<{ user: AdminUser }>()

export const updateUserMutation = createMutation<
  { user: AdminUser },
  { id: string; input: UpdateUserInput }
>({
  name: 'update-user',
  mutationFn: ({ variables, signal }) => updateUser(variables.id, variables.input, signal),
  onSuccess: (ctx) => {
    invalidateUsers()
    void getQueryProvider()?.invalidateQueries(apiKeys.user(ctx.variables.id))
  },
})
