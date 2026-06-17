// @vitest-environment node
import http from 'node:http'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createQuery, createQueryProvider } from '@echojs-ecosystem/async'
import { createHttpClient } from '@echojs-ecosystem/network/http'

import { resetAsyncTestContext } from '../../shared/test-utils/async'
import { listenHttpServer } from '../../shared/test-utils/http-server'

describe('async × network: createQuery + http client', () => {
  beforeEach(() => {
    createQueryProvider()
  })

  afterEach(() => {
    resetAsyncTestContext()
  })

  it('fetches JSON via createQuery bound to http client', async () => {
    const server = http.createServer((_req, res) => {
      res.statusCode = 200
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify({ total: 3 }))
    })
    const { baseUrl, close } = await listenHttpServer(server)

    try {
      const httpClient = createHttpClient({ baseUrl })
      const statsQuery = createQuery<{ total: number }, void>({
        queryKey: () => ['package-tests', 'async', 'stats'],
        queryFn: async () => httpClient.get('/stats').unwrapJson<{ total: number }>(),
      })

      const stats = statsQuery.with()
      await stats.refetch()

      expect(stats.data()?.total).toBe(3)
      expect(stats.isSuccess()).toBe(true)
    } finally {
      await close()
    }
  })
})
