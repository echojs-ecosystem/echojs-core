import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { PackageOverviewView } from './ui/package-overview.view'

export type PackageOverviewProps = { packageId: string }

/** Dynamic child — same mount-context fix as {@link PackagePlayground}. */
export const PackageOverview =
  (props: PackageOverviewProps): Child =>
  () =>
    PackageOverviewView(props)
