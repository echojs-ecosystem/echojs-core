import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import { findBlogPostBySlug } from '@entities/blog/constants/blog.data'
import type {
  BlogPostProps,
  BlogPostVM,
} from '@entities/blog/types/blog.types'

export const createBlogPostModel = (props: BlogPostProps) =>
  createModel(
    (): BlogPostVM => ({
      slug: props.slug,
      post: findBlogPostBySlug(props.slug) ?? null,
      indexPage: props.indexPage,
    }),
    'BlogPostModel'
  )
