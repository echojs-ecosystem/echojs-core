import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import { createPackageInstallModel } from '@widgets/package-install/model/package-install.model'
import type { PackageInstallProps } from '@widgets/package-install/types/package-install.types'
import { PackageInstallView } from '@widgets/package-install/ui/package-install.view'

/** Home hero — `npm create echojs@latest`. */
export const PackageInstall = (props?: PackageInstallProps): Child =>
  createComponent(createPackageInstallModel(props ?? {}), PackageInstallView, {
    name: 'PackageInstall',
  })()

/** Embedded inside hero showcase — no outer panel chrome. */
export const PackageInstallEmbedded = (): Child =>
  PackageInstall({ embedded: true })

/** Package docs — `npm install @echojs-ecosystem/<pkg>`. */
export const PackageInstallAdd = (packageName: string): Child =>
  PackageInstall({ mode: { kind: 'add', packageName } })
