import { createField, createForm } from '@echojs-ecosystem/form'

import { orderEditFormDefaults } from './order-edit.constants'
import { orderEditFormSchema, type OrderEditFormValue } from './order-edit.validation'

export type OrderEditFields = {
  customer: ReturnType<typeof createField<string>>
  total: ReturnType<typeof createField<number>>
  status: ReturnType<typeof createField<OrderEditFormValue['status']>>
  tags: ReturnType<typeof createField<string[]>>
}

export const orderEditForm = createForm<OrderEditFormValue, OrderEditFields>(
  {
    customer: createField(''),
    total: createField(0),
    status: createField(orderEditFormDefaults.status),
    tags: createField<string[]>([]),
  },
  {
    name: 'OrderEditForm',
    validationSchema: orderEditFormSchema,
    defaultValues: orderEditFormDefaults,
  },
)
