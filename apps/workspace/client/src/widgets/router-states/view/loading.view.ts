import { div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

export const RouterLoadingView = (): Child =>
  div({ class: 'flex min-h-dvh items-center justify-center' }, p(null, 'Loading…'))
