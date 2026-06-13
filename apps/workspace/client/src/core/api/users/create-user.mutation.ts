import { createMutation } from '@echojs-ecosystem/async'
import type { AdminUser, CreateUserInput } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { invalidateUsers } from '../invalidate'
import { apiPaths } from '../paths'

const createUser = (input: CreateUserInput, signal?: AbortSignal) =>
  httpClient.post(apiPaths.users(), { json: input, signal }).unwrapJson<{ user: AdminUser }>()

export const createUserMutation = createMutation<{ user: AdminUser }, CreateUserInput>({
  name: 'create-user',
  mutationFn: ({ variables, signal }) => createUser(variables, signal),
  onSuccess: invalidateUsers,
})
