import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import type { HeaderDropdownProps } from '@widgets/header-dropdown/model/header-dropdown.model.js'
import { VersionIcon } from '@widgets/icons'
import {
  $docVersionId,
  DOC_VERSIONS,
  setDocVersionId,
} from '@widgets/version-dropdown/constants/doc-versions.js'
import { i18n } from '@core/providers'

export type VersionDropdownVM = {
  dropdownProps: HeaderDropdownProps
}

export const createVersionDropdownModel = createModel((): VersionDropdownVM => {
  return {
    dropdownProps: {
      ariaLabel: () => i18n.t('shell.versionMenu'),
      selectedId: () => $docVersionId.value(),
      triggerIcon: VersionIcon,
      triggerLabel: () => {
        const entry = DOC_VERSIONS.find((v) => v.id === $docVersionId.value())
        return entry?.label ?? 'v0.1'
      },
      options: () =>
        DOC_VERSIONS.map((v) => ({
          id: v.id,
          label: v.label,
          badge: v.badge,
          disabled: v.disabled,
        })),
      onSelect: setDocVersionId,
    },
  }
}, 'VersionDropdownModel')
