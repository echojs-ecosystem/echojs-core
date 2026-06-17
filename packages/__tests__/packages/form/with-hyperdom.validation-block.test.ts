// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { bindField, createField, createForm } from '@echojs-ecosystem/form'
import { createView, h, render } from '@echojs-ecosystem/hyperdom'
import { z } from 'zod'

import { flush } from '../../shared/test-utils/flush'

const schema = z.object({
  customer: z.string().trim().min(1, 'Customer is required'),
})

type FormValue = z.infer<typeof schema>

describe('form × hyperdom: validation edge cases', () => {
  it('blocks submit and keeps empty value visible when validation fails', async () => {
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
        h('div', null, [
          h('input', {
            'data-testid': 'customer',
            ...bindings,
          }),
          h('span', {
            'data-testid': 'error',
          }, () => {
            const schema = form.$schemaErrors.value()
            return schema?.customer?.[0] ?? ''
          }),
        ]),
      'OrderFormView',
    )

    const container = document.createElement('div')
    const dispose = render(FormView(), container)

    const result = await form.submit(async () => {})
    await flush()

    expect(result.ok).toBe(false)
    if (!result.ok) {
      const schema = result.errors.$schema as Record<string, string[]> | undefined
      expect(schema?.customer?.[0]).toContain('required')
    }
    expect(form.fields.customer.value()).toBe('')
    expect(container.querySelector('[data-testid="error"]')?.textContent).toContain('required')

    dispose()
  })

  it('clears validation errors after valid input and successful submit', async () => {
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

    const bad = await form.submit(async () => {})
    expect(bad.ok).toBe(false)

    bindings.onInput({
      currentTarget: { value: 'Acme' },
    } as Event & { currentTarget: HTMLInputElement })
    await flush()

    const ok = await form.submit(async () => {})
    expect(ok.ok).toBe(true)
    if (ok.ok) expect(ok.value.customer).toBe('Acme')

    const errors = form.$schemaErrors.value()?.customer
    expect(!errors || errors.length === 0).toBe(true)

    dispose()
  })
})
