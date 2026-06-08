import {
  type Child,
  createView,
  div,
  p,
  pre,
} from '@echojs-ecosystem/framework/hyperdom'
import { mount as onMount } from '@echojs-ecosystem/framework/hyperdom/lifecycle/mount'

import { playgroundStyles } from '@widgets/package-playground/ui/package-playground.view.styles'

import type { PackagePlaygroundVM } from '../model/package-playground.model'

const styles = playgroundStyles()

export const PackagePlaygroundView = createView(
  (vm: PackagePlaygroundVM): Child => {
    const { def, instance } = vm

    if (!def || !instance) {
      return div({ class: styles.unavailable() }, [
        p(null, `Playground "${vm.packageId}" is not registered.`),
      ])
    }

    return div({ class: styles.root() }, [
      onMount(() => () => instance.dispose?.()),
      div({ class: styles.header() }, [
        div(null, [
          p({ class: styles.title() }, def.title),
          p({ class: styles.hint() }, def.hint),
        ]),
      ]),
      div({ class: styles.grid() }, [
        div({ class: styles.preview() }, () => instance.view()),
        div({ class: styles.statePanel() }, [
          p({ class: styles.stateLabel() }, 'Live state'),
          div({ class: styles.stateBody() }, [
            pre({ class: styles.statePre() }, () =>
              JSON.stringify(instance.$snapshot.value(), null, 2)
            ),
          ]),
        ]),
      ]),
    ])
  },
  'PackagePlaygroundView'
)
