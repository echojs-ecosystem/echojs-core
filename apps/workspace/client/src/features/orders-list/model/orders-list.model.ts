import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { getUrlStateRouter } from '@echojs-ecosystem/url-state'
import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import { i18n } from '@core/i18n/index'
import { appPermission } from '@core/permission/index.js'
import {
  deleteOrderMutation,
  ordersListQuery,
  refundOrderMutation,
} from '@core/api/index'

import { ordersListQueryParams } from './orders-list.query-params'

export const ORDER_STATUSES = ['all', 'pending', 'paid', 'shipped', 'refunded'] as const
export const ORDER_FILTER_TAGS = ['priority', 'eu', 'us', 'trial'] as const

export type OrderStatusFilter = (typeof ORDER_STATUSES)[number]

export const ordersListModel = createModel(() => {
  const list = ordersListQuery.with(() => {
    const filters = ordersListQueryParams.value()
    return {
      q: filters.q,
      page: filters.page,
      status: filters.status,
      priority: filters.priority,
      tag: [...filters.tag],
    }
  })

  const refundOrder = refundOrderMutation.create()
  const deleteOrder = deleteOrderMutation.create()

  const setQ = (value: string): void => {
    ordersListQueryParams.set({ q: value, page: 1 })
  }

  const setStatus = (next: OrderStatusFilter): void => {
    ordersListQueryParams.set({ status: next, page: 1 })
  }

  const setPriority = (checked: boolean): void => {
    ordersListQueryParams.set({ priority: checked, page: 1 })
  }

  const toggleTag = (value: string): void => {
    const current = ordersListQueryParams.value().tag
    const next = current.includes(value) ? current.filter((t) => t !== value) : [...current, value]
    ordersListQueryParams.set({ tag: next, page: 1 })
  }

  const isTagSelected = (value: string): boolean => ordersListQueryParams.value().tag.includes(value)

  const resetFilters = (): void => {
    ordersListQueryParams.reset()
  }

  const prevPage = (): void => {
    const page = list.data()?.page ?? 1
    ordersListQueryParams.set({ page: Math.max(1, page - 1) })
  }

  const nextPage = (): void => {
    const response = list.data()
    const page = response?.page ?? 1
    const totalPages = response?.totalPages ?? 1
    ordersListQueryParams.set({ page: Math.min(totalPages, page + 1) })
  }

  const deleteOrderById = (order: AdminOrder): void => {
    if (!appPermission.check('order.delete', order)) return
    if (!window.confirm(i18n.t('orders.deleteConfirm', { id: order.id }))) return
    void deleteOrder.run({ id: order.id })
  }

  const refundOrderById = (order: AdminOrder): void => {
    void refundOrder.run({ id: order.id })
  }

  const debugSnapshot = (): string =>
    JSON.stringify(
      {
        url: getUrlStateRouter()?.$fullPath.value() ?? '',
        queryState: ordersListQueryParams.value(),
        api: list.data(),
      },
      null,
      2,
    )

  return {
    ORDER_STATUSES,
    ORDER_FILTER_TAGS,
    q: () => ordersListQueryParams.value().q,
    status: () => ordersListQueryParams.value().status,
    priority: () => ordersListQueryParams.value().priority,
    tag: () => ordersListQueryParams.value().tag,
    setQ,
    setStatus,
    setPriority,
    toggleTag,
    isTagSelected,
    resetFilters,
    prevPage,
    nextPage,
    data: () => list.data(),
    items: () => list.data()?.items ?? [],
    isPending: () => list.isPending(),
    statusText: () => list.status(),
    pendingAction: () => deleteOrder.isPending() || refundOrder.isPending(),
    deleteOrderById,
    refundOrderById,
    isRefundPending: () => refundOrder.isPending(),
    debugSnapshot,
  }
}, 'OrdersListModel')

export type OrdersListVM = ReturnType<typeof ordersListModel>
