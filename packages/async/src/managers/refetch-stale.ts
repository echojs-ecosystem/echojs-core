import { getRegisteredClients } from './register-client'

export const refetchStaleActiveQueries = (
  _client: unknown,
  reason: 'focus' | 'reconnect',
): void => {
  for (const client of getRegisteredClients()) {
    if (reason === 'focus') {
      client.queryCache.onFocus()
      client.infiniteQueryCache.onFocus()
    } else {
      client.queryCache.onOnline()
      client.infiniteQueryCache.onOnline()
    }
  }
}
