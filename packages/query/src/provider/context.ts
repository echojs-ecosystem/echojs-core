import type { QueryProvider } from './query-provider'

let activeProvider: QueryProvider | null = null

export const getQueryProvider = (): QueryProvider | null => activeProvider

export const setActiveQueryProvider = (provider: QueryProvider | null): void => {
  activeProvider = provider
}

export const resetQueryProvider = (): void => {
  activeProvider = null
}
