import { createView, div, span } from '@echojs-ecosystem/framework/hyperdom'

import { CodeBlock } from '@widgets/code-block'
import { bootstrapExample } from '@entities/home/constants/home.constants.js'
import { codeDots } from '@entities/home/helpers/code-dots.js'
import { homeHeroCodeWindowStyles } from '@entities/home/ui/home-hero-code-window.view.styles.js'

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
