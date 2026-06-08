import { createField, createForm } from '@echojs-ecosystem/form'

import {
  orderFormDefaults,
  orderFormSchema,
  type OrderFormValue,
} from '@entities/order/model/order-form.schema'

type OrderCreateFields = {
  customer: ReturnType<typeof createField<string>>
  total: ReturnType<typeof createField<number>>
  status: ReturnType<typeof createField<OrderFormValue['status']>>
  tags: ReturnType<typeof createField<string[]>>
}

export const orderCreateForm = createForm<OrderFormValue, OrderCreateFields>(
  {
    customer: createField(''),
    total: createField(0),
    status: createField(orderFormDefaults.status),
    tags: createField<string[]>([]),
  },
  {
    name: 'OrderCreateForm',
    validationSchema: orderFormSchema,
    defaultValues: orderFormDefaults,
  },
)
