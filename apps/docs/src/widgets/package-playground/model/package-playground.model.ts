import { createModel, effect } from '@echojs-ecosystem/framework/hyperdom'

import type { PlaygroundInstance, PackagePlaygroundDef } from '../types'
import { getPackagePlayground } from '../registry'

export type PackagePlaygroundModelProps = {
  packageId: string
}

export type PackagePlaygroundVM = {
  def: PackagePlaygroundDef | undefined
  instance: PlaygroundInstance | undefined
  packageId: string
}

export const createPackagePlaygroundModel = (
  props: PackagePlaygroundModelProps
) =>
  createModel((): PackagePlaygroundVM => {
    const def = getPackagePlayground(props.packageId)
    const instance = def?.create()

    if (instance) {
      effect.unmount(() => instance.dispose?.())
    }

    return {
      def,
      instance,
      packageId: props.packageId,
    }
  }, 'PackagePlaygroundModel')
