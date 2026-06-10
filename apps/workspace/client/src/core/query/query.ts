import { createQueryProvider } from '@echojs-ecosystem/framework/async'

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: { staleTime: 60_000 },
  },
})
