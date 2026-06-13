import { createQueryProvider } from '@echojs-ecosystem/framework/async'

export const asyncProvider = createQueryProvider({
  defaultOptions: {
    queries: { staleTime: 60_000 },
  },
})
