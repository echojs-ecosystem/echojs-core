import { bindField } from '@echojs-ecosystem/form'
import {
  button,
  createView,
  div,
  input,
  label,
  option,
  p,
  section,
  select,
  Show,
} from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

import type { OrderCreateVM } from '../model/order-create.model'

const layout = adminLayoutStyles()

export const OrderCreateView = createView((vm: OrderCreateVM): Child => {
  if (!vm.permission.canCreate()) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('permission.denied')))
  }

  const { fields } = vm.form

  return div({ class: layout.page() }, [
    section({ class: `${layout.card()} max-w-2xl` }, [
      p({ class: layout.cardTitle() }, () => i18n.t('orders.create')),
      div({ class: 'mt-6 grid gap-4' }, [
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('orders.colCustomer')),
          input({ class: layout.input(), ...bindField(fields.customer) }),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('orders.colTotal')),
          input({ type: 'number', class: layout.input(), ...bindField(fields.total) }),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('orders.colStatus')),
          select({ class: layout.select(), ...bindField(fields.status) }, [
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
            value: () => vm.state.tagsInput(),
            onInput: (e: { currentTarget: HTMLInputElement }) =>
              vm.functions.setTagsInput(e.currentTarget.value),
          }),
        ]),
      ]),
      Show(
        () => vm.state.error() != null,
        () =>
          p(
            { class: 'mt-4 text-sm text-red-600 dark:text-red-400' },
            () => vm.state.error() ?? '',
          ),
      ),
      div({ class: 'mt-6 flex flex-wrap gap-2' }, [
        button(
          {
            type: 'button',
            class: layout.btnPrimary(),
            disabled: () => vm.state.isSaving(),
            onClick: () => void vm.functions.save(),
          },
          () => (vm.state.isSaving() ? i18n.t('orders.saving') : i18n.t('orders.create')),
        ),
        button({ type: 'button', class: layout.btn(), onClick: vm.functions.cancel }, () =>
          i18n.t('orders.cancel'),
        ),
      ]),
    ]),
  ])
}, 'OrderCreateView')
