import { ECOSYSTEM_VERSION } from '@core/content/ecosystem-version.generated'

export const ECHOJS_GITHUB_REPO = 'https://github.com/echojs/echojs'
export const ECHOJS_ISSUES_URL = 'https://github.com/echojs/echojs/issues'
export const ECHOJS_LICENSE = 'MIT'
export const ECHOJS_MIN_VERSION = ECOSYSTEM_VERSION
export const NODE_MIN_VERSION = '>=22'

export const npmPackageUrl = (name: string): string =>
  `https://www.npmjs.com/package/${name}`
