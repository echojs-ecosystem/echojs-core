import { createHttpClient } from '@echojs-ecosystem/network/http'

export const httpClient = createHttpClient({
  headers: {
    accept: 'application/json',
  },
})
