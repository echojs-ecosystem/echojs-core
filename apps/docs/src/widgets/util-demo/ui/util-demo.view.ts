import { type Child, createView, div, p } from '@echojs-ecosystem/framework/hyperdom'

import type { UtilDemoVM } from '@widgets/util-demo/model/util-demo.model'
import { ud } from '@widgets/util-demo/util-demo-ui'

export const UtilDemoView = createView((vm: UtilDemoVM): Child => {
  const { instance, slug } = vm

  if (!instance) {
    return div(
      { class: ud.placeholder() },
      `Interactive demo for \`${slug}\` is coming soon.`
    )
  }

  return div({ class: ud.root() }, [() => instance.view()])
}, 'UtilDemoView')
