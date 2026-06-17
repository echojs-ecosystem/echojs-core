import type { OrderCreateFormValue } from './order-create.validation'

export const orderCreateFormDefaults: OrderCreateFormValue = {
  customer: '',
  total: 0,
  status: 'pending',
  tags: [],
}
