// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { bindField, createField, createForm } from '@echojs-ecosystem/form'
import { createView, h, render } from '@echojs-ecosystem/hyperdom'
import { z } from 'zod'

import { flush } from '../../shared/test-utils/flush'

const schema = z.object({
  customer: z.string().trim().min(1),
})

type FormValue = z.infer<typeof schema>

describe('form × hyperdom: bindField + render', () => {
  it('updates field value from DOM input and submits validated data', async () => {
    const form = createForm<FormValue, { customer: ReturnType<typeof createField<string>> }>(
      {
        customer: createField(''),
      },
      {
        name: 'OrderForm',
        validationSchema: schema,
        defaultValues: { customer: '' },
      },
    )

    const bindings = bindField(form.fields.customer)

    const FormView = createView(
      () =>
        h('input', {
          'data-testid': 'customer',
          ...bindings,
        }),
      'OrderFormView',
    )

    const container = document.createElement('div')
    const dispose = render(FormView(), container)

    bindings.onInput({
      currentTarget: { value: 'Acme' },
    } as Event & { currentTarget: HTMLInputElement })
    await flush()

    expect(form.fields.customer.value()).toBe('Acme')

    const result = await form.submit(async () => {})
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.customer).toBe('Acme')

    dispose()
  })
})
