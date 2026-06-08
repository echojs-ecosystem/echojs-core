import { createView, div, span } from '@echojs-ecosystem/framework/hyperdom'

import { CodeBlock } from '@widgets/code-block'
import { bootstrapExample } from '@entities/home/constants/home.constants'
import { codeDots } from '@entities/home/helpers/code-dots'
import { homeHeroCodeWindowStyles } from '@entities/home/ui/home-hero-code-window.view.styles'

const home = homeHeroCodeWindowStyles()

export const HomeHeroCodeWindowView = createView(
  () =>
    div({ class: home.codeWindow() }, [
      div({ class: home.codeWindowChrome() }, [
        ...codeDots(),
        span({ class: home.codeWindowTitle() }, 'src/app/bootstrap.ts'),
      ]),
      div({ class: home.codeWindowBody() }, [
        CodeBlock({
          language: 'typescript',
          code: bootstrapExample,
          bare: true,
        }),
      ]),
    ]),
  'HomeHeroCodeWindowView'
)
