import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createAppearancePickerModel } from './model/appearance-picker.model'
import { AppearancePickerView } from './ui/appearance-picker.view'

export const AppearancePicker = createComponent(
  createAppearancePickerModel,
  AppearancePickerView,
  { name: 'AppearancePicker' },
)
