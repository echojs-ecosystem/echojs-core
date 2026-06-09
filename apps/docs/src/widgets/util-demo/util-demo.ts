import { type Child, createComponent } from '@echojs-ecosystem/framework/hyperdom'

import {
  createUtilDemoModel,
  type UtilDemoModelProps,
} from '@widgets/util-demo/model/util-demo.model'
import { UtilDemoView } from '@widgets/util-demo/ui/util-demo.view'

export const UtilDemo = (props: UtilDemoModelProps): Child =>
  createComponent(createUtilDemoModel(props), UtilDemoView, { name: 'UtilDemo' })
