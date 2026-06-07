import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import type { PlaygroundInstance, PackagePlaygroundDef } from '../types.js'
import { getPackagePlayground } from '../registry.js'

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

    return {
      def,
      instance,
      packageId: props.packageId,
    }
  }, 'PackagePlaygroundModel')
