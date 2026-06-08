import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import { createBlogIndexModel } from '@entities/blog/model/blog-index.model'
import { createBlogPostModel } from '@entities/blog/model/blog-post.model'
import type {
  BlogIndexProps,
  BlogPostProps,
} from '@entities/blog/types/blog.types'
import { BlogIndexView } from '@entities/blog/ui/blog-index.view'
import { BlogPostView } from '@entities/blog/ui/blog-post.view'

export {
  blogPosts,
  findBlogPostBySlug,
} from '@entities/blog/constants/blog.data'
export type {
  BlogPost as BlogPostData,
  BlogCategory,
} from '@entities/blog/types/blog.types'
export { BlogIndexView } from '@entities/blog/ui/blog-index.view'
export { BlogPostView } from '@entities/blog/ui/blog-post.view'

export const BlogIndex = (props: BlogIndexProps): Child =>
  createComponent(createBlogIndexModel(props), BlogIndexView, {
    name: 'BlogIndex',
  })()

export const BlogArticle = (props: BlogPostProps): Child =>
  createComponent(createBlogPostModel(props), BlogPostView, {
    name: 'BlogArticle',
  })()
