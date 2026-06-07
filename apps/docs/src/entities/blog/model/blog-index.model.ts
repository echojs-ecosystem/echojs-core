import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import type {
  BlogIndexProps,
  BlogIndexVM,
} from '@entities/blog/types/blog.types.js'

export const createBlogIndexModel = (props: BlogIndexProps) =>
  createModel(
    (): BlogIndexVM => ({ posts: props.posts, postPage: props.postPage }),
    'BlogIndexModel'
  )
