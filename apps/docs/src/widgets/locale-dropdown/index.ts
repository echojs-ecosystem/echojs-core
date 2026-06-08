import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createLocaleDropdownModel } from '@widgets/locale-dropdown/model/locale-dropdown.model'
import { LocaleDropdownView } from '@widgets/locale-dropdown/ui/locale-dropdown.view'

export const LocaleDropdown = createComponent(
  createLocaleDropdownModel,
  LocaleDropdownView,
  {
    name: 'LocaleDropdown',
  }
)
