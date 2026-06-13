import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { effect, signal } from '@echojs-ecosystem/reactivity'

import { ordersPage } from '@app/router/index'
import { i18n } from '@core/i18n/index'
import { appPermission } from '@core/permission/index.js'
import { updateOrderMutation } from '@core/api/index'
import { orderToFormValue, parseTagsInput } from '@entities/order/model/order-form.mapper'
import { routeOrderDetail, syncRouteOrderId } from '@entities/order/index'

import type { OrderEditProps, OrderEditVM } from '../types/order-edit.types'
import { orderEditForm } from './order-edit.form'

const { customer, total, status, tags } = orderEditForm.fields

export const createOrderEditModel = (props: OrderEditProps) =>
  createModel((): OrderEditVM => {
    syncRouteOrderId(props.orderId)

    const $error = signal<string | null>(null)
    const $hydratedOrderId = signal<string | null>(null)
    const updateOrder = updateOrderMutation.create()

    
    const order = () => routeOrderDetail.data()

    const isLoading = (): boolean => routeOrderDetail.isPending()

    const notFound = (): boolean => !isLoading() && order() == null

    const canEdit = (): boolean => {
      const current = order()
      return current != null && appPermission.check('order.update', current)
    }

    const title = (): string => {
      const current = order()
      return current ? `${i18n.t('orders.edit')}: ${current.id}` : ''
    }

    const tagsInput = (): string => tags.value().join(', ')

    const setTagsInput = (raw: string): void => {
      tags.set(parseTagsInput(raw))
    }

    const error = (): string | null => $error.value()

    const isSaving = (): boolean => updateOrder.isPending()

    const save = async (): Promise<void> => {
      const current = order()
      if (!current) return

      $error.set(null)
      const result = await orderEditForm.submit(async (value) => {
        await updateOrder.run({ id: current.id, input: value })
        ordersPage.go()
      })

      if (!result.ok) $error.set(i18n.t('orders.saveError'))
    }

    const cancel = (): void => {
      ordersPage.go()
    }
    
    effect(() => {
      const order = routeOrderDetail.data()
      if (!order || $hydratedOrderId.peek() === order.id) return
      $hydratedOrderId.set(order.id)
      orderEditForm.hydrate(orderToFormValue(order))
    })
    
    return {
      isLoading,
      notFound,
      canEdit,
      title,
      form: orderEditForm,
      fields: { customer, total, status, tags },
      tagsInput,
      setTagsInput,
      error,
      isSaving,
      save,
      cancel,
    }
  }, 'OrderEditModel')
