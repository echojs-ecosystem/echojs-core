import type { AdminOrder, AdminUser } from '@echojs-ecosystem/workspace-shared'

export type { AdminOrder }

import { seedOrders, seedUsers } from './seed'

const clone = <T>(value: T): T => structuredClone(value)

export const db = {
  users: clone(seedUsers),
  orders: clone(seedOrders),
}

export const findUser = (id: string): AdminUser | undefined => db.users.find((u) => u.id === id)

export const findOrder = (id: string): AdminOrder | undefined =>
  db.orders.find((order) => order.id === id)

export const resetStore = (): void => {
  db.users = clone(seedUsers)
  db.orders = clone(seedOrders)
}
