import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { PackageAsideView } from './ui/package-aside.view'

export type PackageAsideProps = {
  packageId: string
  npmPackage?: string
}

/** Right-rail links for package overview pages. */
export const PackageAside = (props: PackageAsideProps): Child =>
  PackageAsideView(props)
