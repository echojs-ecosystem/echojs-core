import { bindField } from '@echojs-ecosystem/form'
import { button, div, input, label, option, p, section, select } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { ordersPage } from '@app/router/index'
import { appPermission } from '@core/permission/index.js'
import { newOrderPermissionSubject } from '@entities/order/index'
import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'
import { orderCreateForm } from '../model/order-create.form'
import { $orderCreateError, createOrderAction } from '../model/order-create.model'

const layout = adminLayoutStyles()
const fields = orderCreateForm.fields

const parseTags = (raw: string): string[] =>
  raw
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

export const OrderCreateView = (): Child => {
  if (!appPermission.check('order.update', newOrderPermissionSubject)) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('permission.denied')))
  }

  return div({ class: layout.page() }, [
    section({ class: `${layout.card()} max-w-2xl` }, [
      p({ class: layout.cardTitle() }, () => i18n.t('orders.create')),
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
            placeholder: 'priority, eu, trial',
            value: () => fields.tags.value().join(', '),
            onInput: (e: { currentTarget: HTMLInputElement }) =>
              fields.tags.set(parseTags(e.currentTarget.value)),
          }),
        ]),
      ]),
      (): Child =>
        $orderCreateError.value()
          ? p({ class: 'mt-4 text-sm text-red-600 dark:text-red-400' }, () => $orderCreateError.value() ?? '')
          : null,
      div({ class: 'mt-6 flex flex-wrap gap-2' }, [
        button(
          {
            type: 'button',
            class: layout.btnPrimary(),
            disabled: () => createOrderAction.isPending(),
            onClick: async () => {
              $orderCreateError.set(null)
              const result = await orderCreateForm.submit(async (value) => {
                await createOrderAction.run(value)
                ordersPage.go()
              })
              if (!result.ok) $orderCreateError.set(i18n.t('orders.saveError'))
            },
          },
          () => (createOrderAction.isPending() ? i18n.t('orders.saving') : i18n.t('orders.create')),
        ),
        button({ type: 'button', class: layout.btn(), onClick: () => ordersPage.go() }, () =>
          i18n.t('orders.cancel'),
        ),
      ]),
    ]),
  ])
}
