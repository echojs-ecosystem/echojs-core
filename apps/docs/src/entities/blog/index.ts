import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import { createBlogIndexModel } from '@entities/blog/model/blog-index.model.js'
import { createBlogPostModel } from '@entities/blog/model/blog-post.model.js'
import type {
  BlogIndexProps,
  BlogPostProps,
} from '@entities/blog/types/blog.types.js'
import { BlogIndexView } from '@entities/blog/ui/blog-index.view.js'
import { BlogPostView } from '@entities/blog/ui/blog-post.view.js'

export {
  blogPosts,
  findBlogPostBySlug,
} from '@entities/blog/constants/blog.data.js'
export type {
  BlogPost as BlogPostData,
  BlogCategory,
} from '@entities/blog/types/blog.types.js'
export { BlogIndexView } from '@entities/blog/ui/blog-index.view.js'
export { BlogPostView } from '@entities/blog/ui/blog-post.view.js'

export const BlogIndex = (props: BlogIndexProps): Child =>
  createComponent(createBlogIndexModel(props), BlogIndexView, {
    name: 'BlogIndex',
  })()

export const BlogArticle = (props: BlogPostProps): Child =>
  createComponent(createBlogPostModel(props), BlogPostView, {
    name: 'BlogArticle',
  })()
