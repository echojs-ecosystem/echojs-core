import { createMutation } from '../mutation/create-mutation'

const update = createMutation<string, { id: string }>({
  mutationFn: async ({ variables }) => variables.id,
})

const ping = createMutation<string, void>({
  mutationFn: async () => 'pong',
})

const updateInstance = update.create()

// @ts-expect-error — missing required property id
updateInstance.run({})

// @ts-expect-error — void variables must not be {}
ping.create().run({})
