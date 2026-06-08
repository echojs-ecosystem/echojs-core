import {
  button,
  code,
  div,
  h1,
  input,
  label,
  p,
  pre,
  section,
  Show,
  span,
  table,
  tbody,
  td,
  th,
  thead,
  tr,
} from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'
import { getUrlStateRouter } from '@echojs-ecosystem/url-state'
import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import { appPermission } from '@core/permission/index.js'
import { newOrderPermissionSubject } from '@entities/order/index'
import { i18n } from '@core/i18n/index'
import { orderCreatePage, orderEditPage } from '@app/router/index'
import { ordersQueryParams } from '../model/orders-filters'
import { deleteOrder, ordersList, refundOrder } from '../model/orders-list.model'
import { adminLayoutStyles, TableSectionHeader } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

const TAGS = ['priority', 'eu', 'us', 'trial'] as const

export const OrdersListView = (): Child => {
  const response = ordersList.data()
  const filters = ordersQueryParams.value()
  const pendingAction = () => deleteOrder.isPending() || refundOrder.isPending()

  const toggleTag = (tag: string): void => {
    const current = ordersQueryParams.value().tag
    const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]
    ordersQueryParams.set({ tag: next, page: 1 })
  }

  const handleDelete = (order: AdminOrder): void => {
    if (!appPermission.check('order.delete', order)) return
    if (!window.confirm(i18n.t('orders.deleteConfirm', { id: order.id }))) return
    void deleteOrder.run({ id: order.id })
  }

  return div({ class: layout.page() }, [
    h1({ class: 'text-2xl font-bold text-fg' }, () => i18n.t('orders.title')),
    p({ class: layout.muted() }, [
      () => i18n.t('orders.lead'),
      ' • ',
      code({ class: layout.code() }, () => ordersList.status()),
    ]),
    section({ class: `${layout.filterBar()} my-4` }, [
      div({ class: 'grid min-w-[200px] flex-1 gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('orders.search')),
        input({
          class: layout.input(),
          value: filters.q,
          onInput: (e: { currentTarget: HTMLInputElement }) =>
            ordersQueryParams.set({ q: e.currentTarget.value, page: 1 }),
        }),
      ]),
      div({ class: 'flex flex-wrap gap-2' }, [
        ...(['all', 'pending', 'paid', 'shipped', 'refunded'] as const).map((status) =>
          button(
            {
              type: 'button',
              class: layout.btn(),
              onClick: () => ordersQueryParams.set({ status, page: 1 }),
            },
            `status: ${status}`,
          ),
        ),
      ]),
      label({ class: 'flex items-center gap-2 text-sm text-fg-muted' }, [
        input({
          type: 'checkbox',
          checked: filters.priority,
          onChange: (e: { currentTarget: HTMLInputElement }) =>
            ordersQueryParams.set({ priority: e.currentTarget.checked, page: 1 }),
        }),
        span(null, 'Priority only (prio)'),
      ]),
      div({ class: 'flex flex-wrap gap-2' }, [
        ...TAGS.map((tag) =>
          button(
            {
              type: 'button',
              class: layout.btn(),
              onClick: () => toggleTag(tag),
            },
            filters.tag.includes(tag) ? `✓ ${tag}` : tag,
          ),
        ),
        button({ type: 'button', class: layout.btn(), onClick: () => ordersQueryParams.reset() }, () =>
          i18n.t('orders.resetFilters'),
        ),
      ]),
    ]),
    section({ class: layout.card() }, [
      ordersList.isPending()
        ? p({ class: layout.muted() }, () => i18n.t('orders.loading'))
        : [
            TableSectionHeader({
              title: () => i18n.t('orders.tableTitle'),
              count: () => response?.total ?? 0,
              createTo: orderCreatePage,
              createLabel: () => i18n.t('orders.create'),
              canCreate: () => appPermission.check('order.update', newOrderPermissionSubject),
            }),
            div({ class: layout.tableWrap() }, [
              table({ class: layout.table() }, [
                thead([
                  tr([
                    th({ class: layout.th() }, () => i18n.t('orders.colId')),
                    th({ class: layout.th() }, () => i18n.t('orders.colCustomer')),
                    th({ class: layout.th() }, () => i18n.t('orders.colTotal')),
                    th({ class: layout.th() }, () => i18n.t('orders.colStatus')),
                    th({ class: layout.th() }, () => i18n.t('orders.colActions')),
                  ]),
                ]),
                tbody(
                  (response?.items ?? []).map((order) =>
                    tr([
                      td({ class: layout.td() }, order.id),
                      td({ class: layout.td() }, order.customer),
                      td({ class: layout.td() }, `$${order.total}`),
                      td({ class: layout.td() }, order.status),
                      td({ class: layout.td() }, [
                        div({ class: layout.rowActions() }, [
                          Show(
                            () => appPermission.check('order.update', order),
                            () =>
                              NavLink({
                                to: orderEditPage,
                                params: { id: order.id },
                                class: layout.btn(),
                                children: () => i18n.t('orders.edit'),
                              }),
                          ),
                          Show(
                            () => appPermission.check('order.delete', order),
                            () =>
                              button(
                                {
                                  type: 'button',
                                  class: layout.btnDanger(),
                                  disabled: pendingAction(),
                                  onClick: () => handleDelete(order),
                                },
                                () => i18n.t('orders.delete'),
                              ),
                          ),
                          Show(
                            () => appPermission.check('order.refund', order),
                            () =>
                              button(
                                {
                                  type: 'button',
                                  class: layout.btn(),
                                  disabled: pendingAction(),
                                  onClick: () => void refundOrder.run({ id: order.id }),
                                },
                                () => (refundOrder.isPending() ? '…' : i18n.t('orders.refund')),
                              ),
                          ),
                        ]),
                      ]),
                    ]),
                  ),
                ),
              ]),
            ]),
          ],
      p({ class: `${layout.muted()} mt-3` }, () =>
        i18n.t('orders.pagination', {
          page: String(response?.page ?? 1),
          totalPages: String(response?.totalPages ?? 1),
          total: String(response?.total ?? 0),
        }),
      ),
      div({ class: 'mt-2 flex gap-2' }, [
        button(
          {
            type: 'button',
            class: layout.btn(),
            onClick: () => ordersQueryParams.set({ page: Math.max(1, (response?.page ?? 1) - 1) }),
          },
          '←',
        ),
        button(
          {
            type: 'button',
            class: layout.btn(),
            onClick: () =>
              ordersQueryParams.set({
                page: Math.min(response?.totalPages ?? 1, (response?.page ?? 1) + 1),
              }),
          },
          '→',
        ),
      ]),
    ]),
    pre({ class: 'mt-4 overflow-auto rounded-xl bg-code-bg p-4 text-xs text-stone-200' }, () =>
      JSON.stringify(
        {
          url: getUrlStateRouter()?.$fullPath.value() ?? '',
          queryState: ordersQueryParams.value(),
          api: response,
        },
        null,
        2,
      ),
    ),
  ])
}
