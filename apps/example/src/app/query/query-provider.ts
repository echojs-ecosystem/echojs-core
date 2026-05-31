import { createQueryProvider, setQueryProvider } from '@echojs/query'

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      cacheTime: 300_000,
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})

setQueryProvider(queryProvider)
