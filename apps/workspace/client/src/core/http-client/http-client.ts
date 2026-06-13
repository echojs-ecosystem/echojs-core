import { createHttpClient } from '@echojs-ecosystem/network/http'

const resolveBaseUrl = (): string | undefined => {
  if (typeof globalThis.location === 'undefined') return undefined
  return globalThis.location.origin
}

export const httpClient = createHttpClient({
  baseUrl: resolveBaseUrl(),
  headers: {
    accept: 'application/json',
  },
})
