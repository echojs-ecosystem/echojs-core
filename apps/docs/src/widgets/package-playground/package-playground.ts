import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import {
  createPackagePlaygroundModel,
  type PackagePlaygroundModelProps,
} from './model/package-playground.model'
import { PackagePlaygroundView } from './ui/package-playground.view'

/**
 * Dynamic child — tree builds inside hyperdom mount (not while DocRenderer assembles blocks).
 */
export const PackagePlayground = (props: PackagePlaygroundModelProps): Child =>
  createComponent(createPackagePlaygroundModel(props), PackagePlaygroundView, {
    name: 'PackagePlayground',
  })
