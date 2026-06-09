import type { Child } from '@echojs-ecosystem/framework/hyperdom'

export type UtilDemoInstance = {
  view: () => Child
  dispose?: () => void
}

export type UtilDemoDef = {
  slug: string
  title: string
  create: () => UtilDemoInstance
}
