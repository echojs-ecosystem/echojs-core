import { bindField } from '@echojs-ecosystem/form'
import { button, div, input, label, option, p, section, select } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { ordersPage } from '@app/router/index'
import { appPermission } from '@core/permission/index.js'
import { routeOrderDetail, syncRouteOrderId } from '@entities/order/index'
import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'
import { orderEditForm } from '../model/order-edit.form'
import { $orderEditError, hydrateOrderEditForm, updateOrderAction } from '../model/order-edit.model'

const layout = adminLayoutStyles()
const fields = orderEditForm.fields

const parseTags = (raw: string): string[] =>
  raw
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

export const OrderEditView = (props: { params: { id: string } }): Child => {
  syncRouteOrderId(props.params.id)
  const order = routeOrderDetail.data()

  if (routeOrderDetail.isPending()) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('orders.loading')))
  }

  if (!order) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('orders.notFound')))
  }

  if (!appPermission.check('order.update', order)) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('permission.denied')))
  }

  hydrateOrderEditForm(order)

  return div({ class: layout.page() }, [
    section({ class: `${layout.card()} max-w-2xl` }, [
      p({ class: layout.cardTitle() }, () => `${i18n.t('orders.edit')}: ${order.id}`),
      div({ class: 'mt-6 grid gap-4' }, [
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('orders.colCustomer')),
          input({ class: layout.input(), ...bindField(fields.customer, { variant: 'text', controlledValue: true }) }),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('orders.colTotal')),
          input({ class: layout.input(), ...bindField(fields.total, { variant: 'number', controlledValue: true }) }),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('orders.colStatus')),
          select({ class: layout.select(), ...bindField(fields.status, { variant: 'select', controlledValue: true }) }, [
            option({ value: 'pending' }, 'pending'),
            option({ value: 'paid' }, 'paid'),
            option({ value: 'shipped' }, 'shipped'),
            option({ value: 'refunded' }, 'refunded'),
          ]),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('orders.colTags')),
          input({
            class: layout.input(),
            value: () => fields.tags.value().join(', '),
            onInput: (e: { currentTarget: HTMLInputElement }) =>
              fields.tags.set(parseTags(e.currentTarget.value)),
          }),
        ]),
      ]),
      (): Child =>
        $orderEditError.value()
          ? p({ class: 'mt-4 text-sm text-red-600 dark:text-red-400' }, () => $orderEditError.value() ?? '')
          : null,
      div({ class: 'mt-6 flex flex-wrap gap-2' }, [
        button(
          {
            type: 'button',
            class: layout.btnPrimary(),
            disabled: () => updateOrderAction.isPending(),
            onClick: async () => {
              $orderEditError.set(null)
              const result = await orderEditForm.submit(async (value) => {
                await updateOrderAction.run({ id: order.id, input: value })
                ordersPage.go()
              })
              if (!result.ok) $orderEditError.set(i18n.t('orders.saveError'))
            },
          },
          () => (updateOrderAction.isPending() ? i18n.t('orders.saving') : i18n.t('orders.save')),
        ),
        button({ type: 'button', class: layout.btn(), onClick: () => ordersPage.go() }, () =>
          i18n.t('orders.cancel'),
        ),
      ]),
    ]),
  ])
}
