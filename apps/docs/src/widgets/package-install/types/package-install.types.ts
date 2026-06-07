import type { Signal } from '@echojs-ecosystem/framework/reactivity'

import type {
  CommandToken,
  PackageManager,
  PackageManagerId,
} from '@widgets/package-install/constants/install-commands.js'

export type PackageInstallMode =
  | { kind: 'scaffold' }
  | { kind: 'add'; packageName: string }

export type PackageInstallProps = {
  mode?: PackageInstallMode
  embedded?: boolean
}

export type PackageInstallVM = {
  embedded: boolean
  $manager: Signal<PackageManagerId>
  $copied: Signal<boolean>
  managers: PackageManager[]
  activeCommand: () => string
  activeTokens: () => readonly CommandToken[]
  isManagerActive: (id: PackageManagerId) => boolean
  setManager: (id: PackageManagerId) => void
  copy: () => Promise<void>
  copyHint: () => string
  onBodyKeydown: (e: KeyboardEvent) => void
}
