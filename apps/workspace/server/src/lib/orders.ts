import type {
  AdminOrder,
  CreateOrderInput,
  OrdersListQuery,
  OrdersListResponse,
  UpdateOrderInput,
} from '@echojs-ecosystem/workspace-shared'

import { db } from '../data/store'

const PAGE_SIZE = 4

export const filterOrders = (orders: AdminOrder[], query: OrdersListQuery): AdminOrder[] => {
  const q = query.q?.trim().toLowerCase() ?? ''
  const status = query.status ?? 'all'
  const priority = query.priority ?? false
  const tags = query.tag ?? []

  return orders.filter((order) => {
    if (status !== 'all' && order.status !== status) return false
    if (priority && !order.tags.includes('priority')) return false
    if (tags.length > 0 && !tags.some((tag) => order.tags.includes(tag))) return false
    if (!q) return true
    return (
      order.id.toLowerCase().includes(q) ||
      order.customer.toLowerCase().includes(q)
    )
  })
}

export const listOrders = (query: OrdersListQuery): OrdersListResponse => {
  const filtered = filterOrders(db.orders, query)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages)
  const start = (page - 1) * PAGE_SIZE

  return {
    items: filtered.slice(start, start + PAGE_SIZE),
    total: filtered.length,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
  }
}

export const createOrder = (input: CreateOrderInput): AdminOrder => {
  const order: AdminOrder = {
    id: `o-${Date.now()}`,
    customer: input.customer,
    total: input.total,
    status: input.status,
    tags: [...input.tags],
  }
  db.orders.unshift(order)
  return order
}

export const updateOrder = (id: string, input: UpdateOrderInput): AdminOrder | null => {
  const order = db.orders.find((item) => item.id === id)
  if (!order) return null

  if (input.customer !== undefined) order.customer = input.customer
  if (input.total !== undefined) order.total = input.total
  if (input.status !== undefined) order.status = input.status
  if (input.tags !== undefined) order.tags = [...input.tags]

  return order
}

export const deleteOrder = (id: string): boolean => {
  const index = db.orders.findIndex((item) => item.id === id)
  if (index < 0) return false
  db.orders.splice(index, 1)
  return true
}

export const refundOrder = (id: string): AdminOrder | null => {
  const order = db.orders.find((item) => item.id === id)
  if (!order || order.status === 'refunded') return null
  order.status = 'refunded'
  return order
}
