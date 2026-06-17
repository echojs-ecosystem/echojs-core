import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

import { ordersPage } from '@app/router/index'
import { i18n } from '@core/i18n/index'
import { appPermission } from '@core/permission/index.js'
import { createOrderMutation } from '@core/api/index'
import { parseOrderTagsInput } from './helpers/parse-order-tags-input'
import { newOrderPermissionSubject } from '@entities/order/index'

import { orderCreateForm } from './order-create.form'

const { customer, total, status, tags } = orderCreateForm.fields

export const orderCreateModel = createModel(
  () => {
    const $error = signal<string | null>(null)
    const createOrder = createOrderMutation.create()

    const canCreate = (): boolean =>
      appPermission.check('order.update', newOrderPermissionSubject)

    const tagsInput = (): string => tags.value().join(', ')

    const setTagsInput = (raw: string): void => {
      tags.set(parseOrderTagsInput(raw))
    }

    const error = (): string | null => $error.value()

    const isSaving = (): boolean => createOrder.isPending()

    const save = async (): Promise<void> => {
      $error.set(null)
      const result = await orderCreateForm.submit(async (value) => {
        await createOrder.run(value)
        ordersPage.go()
      })

      if (!result.ok) $error.set(i18n.t('orders.saveError'))
    }

    const cancel = (): void => {
      ordersPage.go()
    }

    return {
      state: {
        error,
        isSaving,
        tagsInput,
      },
      form: {
        form: orderCreateForm,
        fields: { customer, total, status, tags },
      },
      permission: {
        canCreate,
      },
      functions: {
        setTagsInput,
        save,
        cancel,
      },
    }
  },
  { name: 'OrderCreateModel', structExports: true },
)

export type OrderCreateVM = ReturnType<typeof orderCreateModel>
