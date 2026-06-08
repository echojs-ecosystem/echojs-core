import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createVersionDropdownModel } from '@widgets/version-dropdown/model/version-dropdown.model'
import { VersionDropdownView } from '@widgets/version-dropdown/ui/version-dropdown.view'

export const VersionDropdown = createComponent(
  createVersionDropdownModel,
  VersionDropdownView,
  {
    name: 'VersionDropdown',
  }
)
