import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { effect, signal } from '@echojs-ecosystem/reactivity'

import { ordersPage } from '@app/router/index'
import { i18n } from '@core/i18n/index'
import { appPermission } from '@core/permission/index.js'
import { updateOrderMutation } from '@core/api/index'
import { orderToFormValue } from './helpers/order-to-form-value'
import { parseOrderTagsInput } from './helpers/parse-order-tags-input'
import { routeOrderDetail, syncRouteOrderId } from '@entities/order/index'

import type { OrderEditProps } from '../types/order-edit.types'
import { orderEditForm } from './order-edit.form'

const { customer, total, status, tags } = orderEditForm.fields

export const orderEditModel = (props: OrderEditProps) =>
  createModel(
    () => {
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

      const setTagsInput = (raw: string): void => {
        tags.set(parseOrderTagsInput(raw))
      }
      
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
        const current = routeOrderDetail.data()
        if (!current || $hydratedOrderId.peek() === current.id) return
        $hydratedOrderId.set(current.id)
        orderEditForm.hydrate(orderToFormValue(current))
      })

      return {
        state: {
          isLoading: () => routeOrderDetail.isPending(),
          notFound: () => !routeOrderDetail.isPending() && order() == null,
          title,
          error: () => $error.value(),
          isSaving: () => updateOrder.isPending(),
          tagsInput: () => tags.value().join(', '),
        },
        form: {
          form: orderEditForm,
          fields: { customer, total, status, tags },
        },
        permission: {
          canEdit,
        },
        functions: {
          setTagsInput,
          save,
          cancel,
        },
      }
    },
    { name: 'OrderEditModel', structExports: true },
  )

export type OrderEditVM = ReturnType<ReturnType<typeof orderEditModel>>
