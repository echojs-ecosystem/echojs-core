import {
  createComponent,
  createView,
  type Child,
} from '@echojs-ecosystem/framework/hyperdom'

import { createHeaderDropdownModel } from '@widgets/header-dropdown/model/header-dropdown.model'
import { HeaderDropdownView } from '@widgets/header-dropdown/ui/header-dropdown.view'
import type { VersionDropdownVM } from '@widgets/version-dropdown/model/version-dropdown.model'

export const VersionDropdownView = createView(
  (vm: VersionDropdownVM): Child =>
    createComponent(
      createHeaderDropdownModel(vm.dropdownProps),
      HeaderDropdownView
    )(),
  'VersionDropdownView'
)
