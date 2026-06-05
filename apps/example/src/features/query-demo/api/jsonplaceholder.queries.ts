import {
  createInfiniteQuery,
  createMutation,
  createQuery,
  getQueryProvider,
} from "@echojs-ecosystem/query";
import type { JpPost, JpUser } from '@shared/api/jsonplaceholder.js'
import { jpFetch } from '@shared/api/jsonplaceholder.js'
import { delay } from '@features/query-demo/utils/query-demo.utils.js'

const POSTS_PAGE_SIZE = 3
const SLOW_QUERY_MS = 4_000
const SLOW_MUTATION_MS = 5_000

export type JpPostsPage = {
  posts: JpPost[]
  nextOffset: number | null
}

/** All users — sidebar list. */
export const listUsersQuery = createQuery<JpUser[]>({
  name: 'jp-users',
  queryKey: () => ['jsonplaceholder', 'users'] as const,
  queryFn: ({ signal }) => jpFetch<JpUser[]>('/users', { signal }),
  transform: (users) =>
    users.map((user) => ({
      ...user,
      name: user.name.trim(),
    })),
})

/** Single user profile — reacts to selected id. */
export const getUserQuery = createQuery({
  name: 'jp-user',
  queryKey: ({ id }: { id: number }) => ['jsonplaceholder', 'user', id] as const,
  keepPreviousData: true,
  abortPrevious: true,
  queryFn: ({ params, signal }) => jpFetch<JpUser>(`/users/${params.id}`, { signal }),
})

/** Posts for the selected user. */
export const getUserPostsQuery = createQuery<JpPost[], { userId: number }>({
  name: 'jp-user-posts',
  queryKey: ({ userId }: { userId: number }) =>
    ['jsonplaceholder', 'posts', { userId }] as const,
  abortPrevious: true,
  queryFn: ({ params, signal }) =>
    jpFetch<JpPost[]>(`/posts?userId=${params.userId}`, { signal }),
  transform: (posts) => posts.slice(0, 5),
})

/** Paginated posts for the selected user — infinite scroll demo. */
export const getUserPostsInfiniteQuery = createInfiniteQuery<
  JpPostsPage,
  { userId: number },
  number
>({
  name: 'jp-user-posts-infinite',
  queryKey: ({ userId }) => ['jsonplaceholder', 'posts-infinite', userId] as const,
  initialPageParam: 0,
  keepPreviousData: true,
  abortPrevious: true,
  queryFn: async ({ params, pageParam, signal }) => {
    const posts = await jpFetch<JpPost[]>(
      `/posts?userId=${params.userId}&_start=${pageParam}&_limit=${POSTS_PAGE_SIZE}`,
      { signal },
    )
    const nextOffset =
      posts.length < POSTS_PAGE_SIZE ? null : pageParam + POSTS_PAGE_SIZE
    return { posts, nextOffset }
  },
  getNextPageParam: (page) => page.nextOffset,
})

/** Slow user fetch — for abort / cancel playground. */
export const slowUserQuery = createQuery<JpUser, { id: number }>({
  name: 'jp-user-slow',
  queryKey: ({ id }) => ['jsonplaceholder', 'user-slow', id] as const,
  abortPrevious: true,
  queryFn: async ({ params, signal }) => {
    await delay(SLOW_QUERY_MS, signal)
    return jpFetch<JpUser>(`/users/${params.id}`, { signal })
  },
})

/** Fake POST — API returns 201 but does not persist data. */
export const createPostMutation = createMutation<
  JpPost,
  { userId: number; title: string; body: string }
>({
  name: 'jp-create-post',
  mutationFn: ({ variables, signal }) =>
    jpFetch<JpPost>('/posts', {
      method: 'POST',
      body: JSON.stringify(variables),
      signal,
    }),
  onSuccess: ({ variables, queryClient }) => {
    queryClient.invalidateQueries(['jsonplaceholder', 'posts'], { refetch: 'active' })
    void getQueryProvider()?.refetchQueries({
      queryKey: ['jsonplaceholder', 'posts', { userId: variables.userId }],
    })
  },
})

/** Slow POST — long delay before request, for mutation abort demo. */
export const slowCreatePostMutation = createMutation<
  JpPost,
  { userId: number; title: string; body: string }
>({
  name: 'jp-create-post-slow',
  mutationFn: async ({ variables, signal }) => {
    await delay(SLOW_MUTATION_MS, signal)
    return jpFetch<JpPost>('/posts', {
      method: 'POST',
      body: JSON.stringify(variables),
      signal,
    })
  },
})
