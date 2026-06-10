import type { QueryProvider } from './query-provider'

let activeProvider: QueryProvider | null = null

export const getQueryProvider = (): QueryProvider | null => activeProvider

export const requireQueryProvider = (): QueryProvider => {
  if (!activeProvider) {
    throw new Error(
      'Query provider is not installed. Call app.use(createQueryProvider(...)) before using queries.',
    )
  }
  return activeProvider
}

export const setActiveQueryProvider = (provider: QueryProvider | null): void => {
  activeProvider = provider
}

export const resetQueryProvider = (): void => {
  activeProvider = null
}
