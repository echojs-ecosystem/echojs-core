import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import { createQuery } from '@echojs-ecosystem/framework/async'
import { effect, signal } from '@echojs-ecosystem/framework/reactivity'

import { attachDocTocScrollSpy } from '@widgets/doc-content/helpers/doc-toc-scroll-spy'
import type { DocArticleProps } from '@entities/doc-article/types/doc-article.types'
import { extractDocToc } from '@core/content/extract-toc'
import { loadContentRaw } from '@core/content/load-content'
import { findNavItemByContentId } from '@core/content/nav'
import { parseMarkdown } from '@core/content/parse-markdown'
import type { ContentId, DocDocument } from '@core/content/types'
import { applySeo } from '@core/seo/apply-seo'

export type DocContentPayload = {
  document: DocDocument
  raw: string
}

const docContentQuery = createQuery<
  DocContentPayload,
  { contentId: ContentId }
>({
  name: 'doc-content',
  queryKey: ({ contentId }) => ['doc-content', contentId] as const,
  queryFn: async ({ params }) => {
    const raw = await loadContentRaw(params.contentId)
    return { document: parseMarkdown(raw), raw }
  },
  staleTime: 3_600_000,
})

export type DocArticleVM = {
  props: DocArticleProps
  query: ReturnType<typeof docContentQuery.with>
  copyPage: () => Promise<void>
  copyPageLabel: () => string
  isTocActive: (id: string) => boolean
  setTocActiveId: (id: string) => void
}

export const createDocArticleModel = (props: DocArticleProps) =>
  createModel((): DocArticleVM => {
    const navItem = findNavItemByContentId(props.contentId)
    const query = docContentQuery.with(() => ({ contentId: props.contentId }))
    const $pageCopied = signal(false)
    const $tocActiveId = signal('')

    effect(() => {
      const content = query.data()
      if (!content) return
      applySeo({
        title: content.document.frontmatter.title,
        description: content.document.frontmatter.description,
        path: navItem
          ? `/docs/${navItem.sectionSlug}/${navItem.slug}`
          : undefined,
      })
    })

    effect(() => {
      const content = query.data()
      if (!content) return

      const entries = extractDocToc(content.document)
      attachDocTocScrollSpy(props.contentId, entries, (id) =>
        $tocActiveId.set(id)
      )
    })

    return {
      props,
      query,
      copyPage: async () => {
        const raw = query.data()?.raw
        if (!raw) return
        await navigator.clipboard.writeText(raw)
        $pageCopied.set(true)
        setTimeout(() => $pageCopied.set(false), 2000)
      },
      copyPageLabel: () => ($pageCopied.value() ? 'Copied' : 'Copy Page'),
      isTocActive: (id) => $tocActiveId.value() === id,
      setTocActiveId: (id) => $tocActiveId.set(id),
    }
  }, 'DocArticleModel')
