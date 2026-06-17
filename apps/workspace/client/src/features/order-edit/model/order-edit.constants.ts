import type { OrderEditFormValue } from './order-edit.validation'

export const orderEditFormDefaults: OrderEditFormValue = {
  customer: '',
  total: 0,
  status: 'pending',
  tags: [],
}
