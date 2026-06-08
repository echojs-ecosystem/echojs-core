import { createField, createForm } from '@echojs-ecosystem/form'

import {
  orderFormDefaults,
  orderFormSchema,
  type OrderFormValue,
} from '@entities/order/model/order-form.schema'

type OrderEditFields = {
  customer: ReturnType<typeof createField<string>>
  total: ReturnType<typeof createField<number>>
  status: ReturnType<typeof createField<OrderFormValue['status']>>
  tags: ReturnType<typeof createField<string[]>>
}

export const orderEditForm = createForm<OrderFormValue, OrderEditFields>(
  {
    customer: createField(''),
    total: createField(0),
    status: createField(orderFormDefaults.status),
    tags: createField<string[]>([]),
  },
  {
    name: 'OrderEditForm',
    validationSchema: orderFormSchema,
    defaultValues: orderFormDefaults,
  },
)
