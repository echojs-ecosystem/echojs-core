import {
  article,
  type Child,
  div,
  h2,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink, type AnyPage } from '@echojs-ecosystem/framework/router'

import { blogCategoryLabels } from '@entities/blog/constants/blog.data'
import type { BlogPost } from '@entities/blog/types/blog.types'
import { blogCardStyles } from '@entities/blog/ui/blog.view.styles'

export type BlogPostCardProps = {
  post: BlogPost
  postPage: AnyPage
}

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export const BlogPostCard = ({ post, postPage }: BlogPostCardProps): Child => {
  const card = blogCardStyles({ category: post.category })

  return NavLink({
    to: postPage,
    params: { slug: post.slug },
    class: card.card(),
    children: article({ class: 'flex h-full flex-col' }, [
      div({ class: card.meta() }, [
        span({ class: card.category() }, blogCategoryLabels[post.category]),
        span({ class: card.date() }, formatDate(post.date)),
      ]),
      h2({ class: card.title() }, post.title),
      p({ class: card.excerpt() }, post.excerpt),
      div({ class: card.footer() }, [
        span(null, `${post.readingMinutes} min read`),
        div(
          { class: card.tags() },
          post.tags.slice(0, 2).map((tag) => span({ class: card.tag() }, tag))
        ),
      ]),
    ]),
  })
}
