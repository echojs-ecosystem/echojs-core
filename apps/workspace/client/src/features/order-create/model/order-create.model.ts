import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

import { ordersPage } from '@app/router/index'
import { i18n } from '@core/i18n/index'
import { appPermission } from '@core/permission/index.js'
import { createOrderMutation } from '@entities/api/index'
import { parseTagsInput } from '@entities/order/model/order-form.mapper'
import { newOrderPermissionSubject } from '@entities/order/index'

import { orderCreateForm } from './order-create.form'

const { customer, total, status, tags } = orderCreateForm.fields

export const createOrderCreateModel = createModel(() => {
  const $error = signal<string | null>(null)
  const createOrder = createOrderMutation.create()

  const canCreate = (): boolean =>
    appPermission.check('order.update', newOrderPermissionSubject)

  const tagsInput = (): string => tags.value().join(', ')

  const setTagsInput = (raw: string): void => {
    tags.set(parseTagsInput(raw))
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
    canCreate,
    form: orderCreateForm,
    fields: { customer, total, status, tags },
    tagsInput,
    setTagsInput,
    error,
    isSaving,
    save,
    cancel,
  }
}, 'OrderCreateModel')

export type OrderCreateVM = ReturnType<typeof createOrderCreateModel>
