import type { AppMessages } from '@core/providers/i18n'
import type { EcosystemPackage } from '@widgets/ecosystem/constants/ecosystem-packages'

type PackageDescriptionKey = {
  [K in keyof AppMessages['ecosystem']['packages']]: `ecosystem.packages.${K & string}.description`
}[keyof AppMessages['ecosystem']['packages']]

const packageKey = (shortName: string): string =>
  shortName.replace(/\//g, '_')

export const ecosystemPackageDescriptionKey = (
  pkg: Pick<EcosystemPackage, 'shortName'>
): PackageDescriptionKey =>
  `ecosystem.packages.${packageKey(pkg.shortName)}.description` as PackageDescriptionKey
