import {
  button,
  code,
  createView,
  div,
  h1,
  input,
  label,
  List,
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
import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import { appPermission } from '@core/permission/index.js'
import { newOrderPermissionSubject } from '@entities/order/index'
import { i18n } from '@core/i18n/index'
import { orderCreatePage, orderEditPage } from '@app/router/index'
import { adminLayoutStyles, TableSectionHeader } from '@widgets/admin-shell/index'

import type { OrdersListVM } from '../model/orders-list.model'

const layout = adminLayoutStyles()

const OrderRow = (vm: OrdersListVM, order: AdminOrder): Child =>
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
                disabled: vm.pendingAction(),
                onClick: () => vm.deleteOrderById(order),
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
                disabled: vm.pendingAction(),
                onClick: () => vm.refundOrderById(order),
              },
              () => (vm.isRefundPending() ? '…' : i18n.t('orders.refund')),
            ),
        ),
      ]),
    ]),
  ])

export const OrdersListView = createView((vm: OrdersListVM): Child =>
  div({ class: layout.page() }, [
    h1({ class: 'text-2xl font-bold text-fg' }, () => i18n.t('orders.title')),
    p({ class: layout.muted() }, [
      () => i18n.t('orders.lead'),
      ' • ',
      code({ class: layout.code() }, () => vm.statusText()),
    ]),
    section({ class: `${layout.filterBar()} my-4` }, [
      div({ class: 'grid min-w-[200px] flex-1 gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('orders.search')),
        input({
          class: layout.input(),
          value: () => vm.q(),
          onInput: (e: { currentTarget: HTMLInputElement }) => vm.setQ(e.currentTarget.value),
        }),
      ]),
      div({ class: 'flex flex-wrap gap-2' }, [
        List(
          () => vm.ORDER_STATUSES,
          (status) =>
            button(
              {
                type: 'button',
                class: layout.btn(),
                onClick: () => vm.setStatus(status),
              },
              `status: ${status}`,
            ),
        ),
      ]),
      label({ class: 'flex items-center gap-2 text-sm text-fg-muted' }, [
        input({
          type: 'checkbox',
          checked: () => vm.priority(),
          onChange: (e: { currentTarget: HTMLInputElement }) =>
            vm.setPriority(e.currentTarget.checked),
        }),
        span(null, 'Priority only (prio)'),
      ]),
      div({ class: 'flex flex-wrap gap-2' }, [
        List(
          () => vm.ORDER_FILTER_TAGS,
          (tag) =>
            button(
              {
                type: 'button',
                class: layout.btn(),
                onClick: () => vm.toggleTag(tag),
              },
              () => (vm.isTagSelected(tag) ? `✓ ${tag}` : tag),
            ),
        ),
        button({ type: 'button', class: layout.btn(), onClick: vm.resetFilters }, () =>
          i18n.t('orders.resetFilters'),
        ),
      ]),
    ]),
    section({ class: layout.card() }, () => {
      const response = vm.data()

      return [
        vm.isPending()
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
                  tbody(List(() => vm.items(), (order) => OrderRow(vm, order))),
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
          button({ type: 'button', class: layout.btn(), onClick: vm.prevPage }, '←'),
          button({ type: 'button', class: layout.btn(), onClick: vm.nextPage }, '→'),
        ]),
      ]
    }),
    pre({ class: 'mt-4 overflow-auto rounded-xl bg-code-bg p-4 text-xs text-stone-200' }, () =>
      vm.debugSnapshot(),
    ),
  ]),
'OrdersListView')
