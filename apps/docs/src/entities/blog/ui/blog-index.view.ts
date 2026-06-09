import {
  type Child,
  createView,
  div,
  h1,
  p,
} from '@echojs-ecosystem/framework/hyperdom'

import { DocContentLayout } from '@widgets/docs-shell/doc-content-layout'
import { docContentPageStyles } from '@widgets/docs-shell/doc-content-layout.styles'
import type { BlogIndexVM } from '@entities/blog/types/blog.types'
import { BlogPostCard } from '@entities/blog/ui/blog-post-card'
import { blogPageStyles } from '@entities/blog/ui/blog.view.styles'

const page = docContentPageStyles()
const blog = blogPageStyles()

export const BlogIndexView = createView(
  (vm: BlogIndexVM): Child =>
    div({ class: page.page() }, [
      DocContentLayout({
        width: 'wide',
        children: [
          div({ class: blog.header() }, [
            h1({ class: blog.title() }, 'Blog'),
            p({ class: blog.lead() }, [
              'Release notes, engineering notes, and tutorials from the EchoJS team. Deep dives on signals, forms, routing, and how we build the docs you are reading.',
            ]),
          ]),
          div(
            { class: blog.grid() },
            vm.posts.map((post) => BlogPostCard({ post, postPage: vm.postPage }))
          ),
        ],
      }),
    ]),
  'BlogIndexView'
)
