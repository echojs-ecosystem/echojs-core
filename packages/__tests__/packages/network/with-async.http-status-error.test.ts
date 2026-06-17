// @vitest-environment node
import http from 'node:http'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createQuery, createQueryProvider } from '@echojs-ecosystem/async'

import { resetAsyncTestContext } from '../../shared/test-utils/async'
import { listenHttpServer } from '../../shared/test-utils/http-server'

describe('network × async: HTTP error surfaces in query', () => {
  beforeEach(() => {
    createQueryProvider()
  })

  afterEach(() => {
    resetAsyncTestContext()
  })

  it('marks query as error when server responds with 500', async () => {
    const server = http.createServer((_req, res) => {
      res.statusCode = 500
      res.end('internal error')
    })
    const { baseUrl, close } = await listenHttpServer(server)

    try {
      const healthQuery = createQuery<never, void>({
        queryKey: () => ['package-tests', 'network', 'health-500'],
        queryFn: async () => {
          const response = await fetch(`${baseUrl}/health`)
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          return (await response.json()) as never
        },
        retry: false,
      })

      const health = healthQuery.with(undefined as void, { enabled: false })
      await expect(health.refetch()).rejects.toThrow('HTTP 500')

      expect(health.isError()).toBe(true)
      expect(health.hasError()).toBe(true)
      expect(String(health.error())).toContain('HTTP 500')
    } finally {
      await close()
    }
  })
})
