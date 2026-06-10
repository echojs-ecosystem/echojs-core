/**
 * Compile-only negative type tests.
 * Checked by: bun run test:types (tsc -p tsconfig.typing.json)
 * Not executed by vitest.
 */
import { createQueryClient } from '../client/query-client'
import { createQuery } from '../query/create-query'

const client = createQueryClient()

const getUser = createQuery<string, { id: string }>({
  queryKey: ({ id }) => ['user', id],
  queryFn: async ({ params }) => params.id,
})

const list = createQuery<string[], void>({
  queryKey: () => ['list'],
  queryFn: async () => ['a'],
})

// @ts-expect-error — missing required params
client.getQueryData(getUser)

// @ts-expect-error — missing required property id
getUser.with({})

// @ts-expect-error — void params must not be {}
list.with({})

// @ts-expect-error — updater must return User, not number
client.setQueryData(getUser, { id: '1' }, () => 123)
