import { describe, expect, it } from 'vitest'

import { createQueryClient } from '../client/query-client'
import {
  getRegisteredClients,
  registerClientWithManagers,
  resetRegisteredClients,
} from './register-client'

describe('register-client', () => {
  it('registers and resets clients', () => {
    resetRegisteredClients()
    const client = createQueryClient()
    registerClientWithManagers(client)
    expect(getRegisteredClients().has(client)).toBe(true)
    resetRegisteredClients()
    expect(getRegisteredClients().size).toBe(0)
  })
})
