import { createModel, effect } from '@echojs-ecosystem/framework/hyperdom'

import { getUtilDemo } from '@widgets/util-demo/registry'
import type { UtilDemoInstance } from '@widgets/util-demo/types'

export type UtilDemoModelProps = { slug: string }

export type UtilDemoVM = {
  slug: string
  instance: UtilDemoInstance | undefined
}

export const createUtilDemoModel = (props: UtilDemoModelProps) =>
  createModel((): UtilDemoVM => {
    const def = getUtilDemo(props.slug)
    const instance = def?.create()

    if (instance) {
      effect.unmount(() => instance.dispose?.())
    }

    return {
      slug: props.slug,
      instance,
    }
  }, 'UtilDemoModel')
