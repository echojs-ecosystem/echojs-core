import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const src = resolve(__dirname, 'src')
const frameworkRoot = resolve(__dirname, '../../../packages/framework/src')
const packagesRoot = resolve(__dirname, '../../../packages')
const workspaceShared = resolve(__dirname, '../shared/src/index.ts')

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: [
      { find: '@app', replacement: resolve(src, 'app') },
      { find: '@pages', replacement: resolve(src, 'pages') },
      { find: '@entities', replacement: resolve(src, 'entities') },
      { find: '@widgets', replacement: resolve(src, 'widgets') },
      { find: '@features', replacement: resolve(src, 'features') },
      { find: '@core', replacement: resolve(src, 'core') },
      {
        find: '@echojs-ecosystem/workspace-shared',
        replacement: workspaceShared,
      },
      {
        find: '@echojs-ecosystem/framework/app',
        replacement: resolve(frameworkRoot, 'app/index.ts'),
      },
      {
        find: '@echojs-ecosystem/framework/router/hyperdom',
        replacement: resolve(frameworkRoot, 'router.ts'),
      },
      {
        find: '@echojs-ecosystem/framework/hyperdom/lifecycle/mount',
        replacement: resolve(frameworkRoot, 'hyperdom-lifecycle-mount.ts'),
      },
      {
        find: '@echojs-ecosystem/framework/ui',
        replacement: resolve(frameworkRoot, 'ui.ts'),
      },
      {
        find: /^@echojs-ecosystem\/framework\/(.+)$/,
        replacement: `${frameworkRoot}/$1.ts`,
      },
      {
        find: /^@echojs-ecosystem\/framework$/,
        replacement: resolve(frameworkRoot, 'index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/permission$/,
        replacement: resolve(packagesRoot, 'permission/src/index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/query$/,
        replacement: resolve(packagesRoot, 'query/src/index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/reactivity$/,
        replacement: resolve(packagesRoot, 'reactivity/src/index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/router$/,
        replacement: resolve(packagesRoot, 'router/src/index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/store$/,
        replacement: resolve(packagesRoot, 'store/src/index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/persist$/,
        replacement: resolve(packagesRoot, 'persist/src/index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/url-state$/,
        replacement: resolve(packagesRoot, 'url-state/src/index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/form$/,
        replacement: resolve(packagesRoot, 'form/src/index.ts'),
      },
      {
        find: /^@echojs-ecosystem\/form\/(.+)$/,
        replacement: `${resolve(packagesRoot, 'form/src')}/$1.ts`,
      },
      {
        find: '@echojs-ecosystem/network/http',
        replacement: resolve(packagesRoot, 'network/src/http/index.ts'),
      },
      {
        find: '@echojs-ecosystem/network/ws',
        replacement: resolve(packagesRoot, 'network/src/ws/index.ts'),
      },
      {
        find: '@echojs-ecosystem/network/mock',
        replacement: resolve(packagesRoot, 'network/src/mock/index.ts'),
      },
      {
        find: '@echojs-ecosystem/network/graphql',
        replacement: resolve(packagesRoot, 'network/src/graphql/index.ts'),
      },
    ],
  },
  server: {
    port: 3002,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    exclude: [
      '@echojs-ecosystem/framework',
      '@echojs-ecosystem/permission',
      '@echojs-ecosystem/query',
      '@echojs-ecosystem/reactivity',
      '@echojs-ecosystem/router',
      '@echojs-ecosystem/store',
      '@echojs-ecosystem/persist',
      '@echojs-ecosystem/url-state',
      '@echojs-ecosystem/form',
      '@echojs-ecosystem/network',
    ],
  },
})
