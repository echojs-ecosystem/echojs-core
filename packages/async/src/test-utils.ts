import { createQueryClient } from './client/query-client'
import { resetDefaultQueryClient } from './client/default-client'
import { resetRegisteredClients } from './managers/register-client'
import { resetMutationIdCounter } from './core/mutation'
import { resetQueryProvider } from './provider/context'

export const createTestClient = () => {
  resetQueryProvider()
  resetDefaultQueryClient()
  resetRegisteredClients()
  resetMutationIdCounter()
  return createQueryClient()
}

export const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms))

export const flush = () => new Promise((r) => setTimeout(r, 0))

export const deferred = <T>() => {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}
