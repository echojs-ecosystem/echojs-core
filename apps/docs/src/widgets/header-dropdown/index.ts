import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import {
  createHeaderDropdownModel,
  type HeaderDropdownProps,
} from '@widgets/header-dropdown/model/header-dropdown.model'
import { HeaderDropdownView } from '@widgets/header-dropdown/ui/header-dropdown.view'

export type {
  HeaderDropdownOption,
  HeaderDropdownProps,
} from '@widgets/header-dropdown/model/header-dropdown.model'

export const HeaderDropdown = (props: HeaderDropdownProps): Child =>
  createComponent(createHeaderDropdownModel(props), HeaderDropdownView, {
    name: 'HeaderDropdown',
  })()
