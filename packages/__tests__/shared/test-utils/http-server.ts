import http from 'node:http'

export const listenHttpServer = async (
  server: http.Server,
): Promise<{ baseUrl: string; close: () => Promise<void> }> => {
  await new Promise<void>((resolve) => server.listen(0, resolve))
  const addr = server.address()
  if (addr === null || typeof addr === 'string') throw new Error('invalid address')
  const baseUrl = `http://127.0.0.1:${addr.port}`
  return {
    baseUrl,
    close: async () => {
      await new Promise<void>((resolve, reject) =>
        server.close((err: NodeJS.ErrnoException | null | undefined) =>
          err ? reject(err) : resolve(),
        ),
      )
    },
  }
}
