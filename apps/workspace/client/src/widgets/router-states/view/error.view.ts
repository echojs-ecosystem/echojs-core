import { div, h1, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

export const RouterErrorView = (): Child =>
  div({ class: 'flex min-h-dvh flex-col items-center justify-center gap-2 p-6' }, [
    h1({ class: 'text-xl font-bold text-fg' }, 'Router error'),
    p({ class: 'text-fg-muted' }, 'Something went wrong while loading this route.'),
  ])
