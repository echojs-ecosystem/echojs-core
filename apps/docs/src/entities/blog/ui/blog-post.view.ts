import {
  type Child,
  createView,
  div,
  h1,
  p,
  Show,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { DocContentLayout } from '@widgets/docs-shell/doc-content-layout'
import { docContentPageStyles } from '@widgets/docs-shell/doc-content-layout.styles'
import { blogCategoryLabels } from '@entities/blog/constants/blog.data'
import type { BlogPostVM } from '@entities/blog/types/blog.types'
import { blogPageStyles } from '@entities/blog/ui/blog.view.styles'

const page = docContentPageStyles()
const blog = blogPageStyles()

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

export const BlogPostView = createView((vm: BlogPostVM): Child => {
  const post = vm.post

  return div({ class: page.page() }, [
    DocContentLayout({
      children: [
        NavLink({
          to: vm.indexPage,
          class: blog.backLink(),
          children: '← Back to blog',
        }),
        Show(
          () => post === null,
          () =>
            div({ class: blog.notFound() }, [
              p({ class: blog.notFoundTitle() }, 'Post not found'),
              p(
                { class: blog.notFoundBody() },
                'This article may have moved or the link is outdated.'
              ),
            ]),
          () => {
            if (!post) return null
            return div({ class: blog.article() }, [
              div({ class: blog.articleHeader() }, [
                h1({ class: blog.articleTitle() }, post.title),
                p({ class: blog.articleMeta() }, [
                  span(null, formatDate(post.date)),
                  span(null, '·'),
                  span(null, post.author),
                  span(null, '·'),
                  span(null, blogCategoryLabels[post.category]),
                  span(null, '·'),
                  span(null, `${post.readingMinutes} min read`),
                ]),
              ]),
              div(
                { class: blog.articleBody() },
                post.body.map((paragraph) => p(null, paragraph))
              ),
            ])
          }
        ),
      ],
    }),
  ])
}, 'BlogPostView')
