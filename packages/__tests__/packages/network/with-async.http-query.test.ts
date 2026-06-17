// @vitest-environment node
import http from 'node:http'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createQuery, createQueryProvider } from '@echojs-ecosystem/async'
import { createHttpClient } from '@echojs-ecosystem/network/http'

import { resetAsyncTestContext } from '../../shared/test-utils/async'
import { listenHttpServer } from '../../shared/test-utils/http-server'

describe('network × async: http client inside queryFn', () => {
  beforeEach(() => {
    createQueryProvider()
  })

  afterEach(() => {
    resetAsyncTestContext()
  })

  it('unwraps JSON response through createQuery refetch', async () => {
    const server = http.createServer((_req, res) => {
      res.statusCode = 200
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify({ ok: true }))
    })
    const { baseUrl, close } = await listenHttpServer(server)

    try {
      const client = createHttpClient({ baseUrl })
      const healthQuery = createQuery<{ ok: boolean }, void>({
        queryKey: () => ['package-tests', 'network', 'health'],
        queryFn: async () => client.get('/health').unwrapJson<{ ok: boolean }>(),
      })

      const health = healthQuery.with()
      await health.refetch()

      expect(health.data()?.ok).toBe(true)
    } finally {
      await close()
    }
  })
})
