import { type Child, code, span } from '@echojs-ecosystem/framework/hyperdom'

import type {
  CommandToken,
  CommandTokenKind,
} from '@widgets/package-install/constants/install-commands'
import { packageInstallStyles } from '@widgets/package-install/ui/package-install.view.styles'

const styles = packageInstallStyles()

const tokenClass = (kind: CommandTokenKind): string => {
  switch (kind) {
    case 'pm':
      return styles.tokenPm()
    case 'verb':
      return styles.tokenVerb()
    case 'pkg':
      return styles.tokenPkg()
    case 'arg':
      return styles.tokenArg()
  }
}

export const HighlightedCommand = (tokens: CommandToken[]): Child =>
  code(
    { class: styles.command() },
    tokens.map((t) => span({ class: tokenClass(t.kind) }, t.text))
  )
