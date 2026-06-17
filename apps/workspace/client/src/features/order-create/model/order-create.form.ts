import { createField, createForm } from '@echojs-ecosystem/form'

import { orderCreateFormDefaults } from './order-create.constants'
import { orderCreateFormSchema, type OrderCreateFormValue } from './order-create.validation'

export type OrderCreateFields = {
  customer: ReturnType<typeof createField<string>>
  total: ReturnType<typeof createField<number>>
  status: ReturnType<typeof createField<OrderCreateFormValue['status']>>
  tags: ReturnType<typeof createField<string[]>>
}

export const orderCreateForm = createForm<OrderCreateFormValue, OrderCreateFields>(
  {
    customer: createField(''),
    total: createField(0),
    status: createField(orderCreateFormDefaults.status),
    tags: createField<string[]>([]),
  },
  {
    name: 'OrderCreateForm',
    validationSchema: orderCreateFormSchema,
    defaultValues: orderCreateFormDefaults,
  },
)
