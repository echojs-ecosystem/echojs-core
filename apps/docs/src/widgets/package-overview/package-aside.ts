import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { PackageAsideView } from './ui/package-aside.view'

export type PackageAsideProps = {
  packageId: string
  keywords?: string[]
  npmPackage?: string
}

/** Right-rail metadata for package overview pages (Kubb-style). */
export const PackageAside = (props: PackageAsideProps): Child =>
  PackageAsideView(props)
