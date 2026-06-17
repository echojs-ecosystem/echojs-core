// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { createField } from '@echojs-ecosystem/form'
import { withMemoryStorage } from '@echojs-ecosystem/persist'

import { flush } from '../../shared/test-utils/flush'

describe('form × persist: field storage', () => {
  it('restores field value after hydrate on the same field', async () => {
    const email = createField('').extend(
      withMemoryStorage({ key: 'package-tests:form:email-restore', hydrate: false }),
    )

    await email.persist.hydrate()
    email.set('draft@echojs.dev')
    await email.persist.save()
    await flush()

    email.set('')
    expect(email.value()).toBe('')

    await email.persist.hydrate()
    await flush()

    expect(email.value()).toBe('draft@echojs.dev')
    expect(email.persist.$hydrated.value()).toBe(true)
  })
})
