import type { QueryClient } from '../types'

let defaultClient: QueryClient | null = null
let pendingFactory: (() => QueryClient) | null = null

export const setDefaultQueryClient = (client: QueryClient): void => {
  defaultClient = client
}

export const registerDefaultQueryClientFactory = (factory: () => QueryClient): void => {
  pendingFactory = factory
}

export const getDefaultQueryClient = (): QueryClient => {
  if (!defaultClient) {
    if (!pendingFactory) {
      throw new Error(
        '@echojs-ecosystem/async: no default QueryClient. Call createQueryClient() first or pass { client } to .with().',
      )
    }
    defaultClient = pendingFactory()
    pendingFactory = null
  }
  return defaultClient
}

export const resetDefaultQueryClient = (): void => {
  defaultClient = null
  pendingFactory = null
}
