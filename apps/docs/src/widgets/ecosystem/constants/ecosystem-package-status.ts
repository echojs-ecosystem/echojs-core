import type { AppMessages } from '@core/providers/i18n'
import type { EcosystemPackage } from '@widgets/ecosystem/constants/ecosystem-packages'

export type EcosystemPackageStatus = 'stable' | 'development' | 'experimental'

export type EcosystemPackageStatusTone = 'green' | 'yellow' | 'red'

type StatusLabelKey = {
  [K in keyof AppMessages['ecosystem']['status']]: `ecosystem.status.${K & string}`
}[keyof AppMessages['ecosystem']['status']]

type StatusMeta = {
  labelKey: StatusLabelKey
  tone: EcosystemPackageStatusTone
}

const statusMeta: Record<EcosystemPackageStatus, StatusMeta> = {
  stable: { labelKey: 'ecosystem.status.stable', tone: 'green' },
  development: { labelKey: 'ecosystem.status.development', tone: 'yellow' },
  experimental: { labelKey: 'ecosystem.status.experimental', tone: 'red' },
}

export const resolveEcosystemPackageStatus = (
  pkg: EcosystemPackage
): EcosystemPackageStatus => pkg.status ?? 'stable'

export const ecosystemPackageStatusMeta = (
  pkg: EcosystemPackage
): StatusMeta => statusMeta[resolveEcosystemPackageStatus(pkg)]
