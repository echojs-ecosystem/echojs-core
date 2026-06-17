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

import { ORDER_FILTER_TAGS, ORDER_STATUSES, type OrderStatusFilter } from './orders-list.constants'
import { ordersListQueryParams } from './orders-list.query-params'

export type { OrderStatusFilter } from './orders-list.constants'

export const ordersListModel = createModel(
  () => {
    const ordersList = ordersListQuery.with(() => {
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

    const isTagSelected = (value: string): boolean =>
      ordersListQueryParams.value().tag.includes(value)

    const resetFilters = (): void => {
      ordersListQueryParams.reset()
    }

    const ordersListResponse = () => ordersList.data()
    const orderPage = () => ordersListResponse()?.page ?? 1
    const orderTotalPages = () => ordersListResponse()?.totalPages ?? 1
    const orderTotal = () => ordersListResponse()?.total ?? 0

    const prevPage = (): void => {
      ordersListQueryParams.set({ page: Math.max(1, orderPage() - 1) })
    }

    const nextPage = (): void => {
      ordersListQueryParams.set({ page: Math.min(orderTotalPages(), orderPage() + 1) })
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
          api: ordersList.data(),
        },
        null,
        2,
      )

    return {
      state: {
        q: () => ordersListQueryParams.value().q,
        status: () => ordersListQueryParams.value().status,
        priority: () => ordersListQueryParams.value().priority,
        isPending: () => ordersList.isPending(),
        statusText: () => ordersList.status(),
        pendingAction: () => deleteOrder.isPending() || refundOrder.isPending(),
        isRefundPending: () => refundOrder.isPending(),
        orderPage,
        orderTotalPages,
        orderTotal,
      },
      data: {
        orderStatuses: ORDER_STATUSES,
        orderFilterTags: ORDER_FILTER_TAGS,
        ordersListResponse,
        ordersListItems: () => ordersListResponse()?.items ?? [],
      },
      functions: {
        setQ,
        setStatus,
        setPriority,
        toggleTag,
        isTagSelected,
        resetFilters,
        prevPage,
        nextPage,
        deleteOrderById,
        refundOrderById,
        debugSnapshot,
      },
    }
  },
  { name: 'OrdersListModel', structExports: true },
)

export type OrdersListVM = ReturnType<typeof ordersListModel>
