import type { QueryClient } from '../types'

const clients = new Set<QueryClient>()

export const registerClientWithManagers = (
  client: QueryClient,
): void => {
  clients.add(client)
}

export const getRegisteredClients = (): Set<QueryClient> => clients

export const resetRegisteredClients = (): void => {
  clients.clear()
}
