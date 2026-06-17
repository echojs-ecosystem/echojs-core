import { describe, expect, it } from 'vitest'
import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import { orderToFormValue } from './order-to-form-value'

const sampleOrder: AdminOrder = {
  id: 'ord_1',
  customer: 'Acme Corp',
  total: 120,
  status: 'paid',
  tags: ['priority', 'eu'],
}

describe('orderToFormValue', () => {
  it('maps order fields to form value', () => {
    expect(orderToFormValue(sampleOrder)).toEqual({
      customer: 'Acme Corp',
      total: 120,
      status: 'paid',
      tags: ['priority', 'eu'],
    })
  })

  it('copies tags array', () => {
    const formValue = orderToFormValue(sampleOrder)

    expect(formValue.tags).not.toBe(sampleOrder.tags)
    expect(formValue.tags).toEqual(sampleOrder.tags)
  })
})
