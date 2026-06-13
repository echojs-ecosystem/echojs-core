import { getQueryProvider } from '@echojs-ecosystem/async'

import { apiKeys } from './keys'

export const invalidateUsers = (): void => {
  const client = getQueryProvider()
  void client?.invalidateQueries(apiKeys.usersRoot())
  void client?.invalidateQueries(apiKeys.dashboardStats())
}

export const invalidateOrders = (): void => {
  const client = getQueryProvider()
  void client?.invalidateQueries(apiKeys.ordersRoot())
  void client?.invalidateQueries(apiKeys.dashboardStats())
}
