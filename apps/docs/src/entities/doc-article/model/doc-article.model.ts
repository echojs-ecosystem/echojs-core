import { createQuery } from "@echojs/query";
import { effect } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";
import { loadContentRaw } from "@shared/content/load-content.js";
import { parseMarkdown } from "@shared/content/parse-markdown.js";
import { findNavItemByContentId } from "@shared/content/nav.js";
import type { ContentId, DocDocument } from "@shared/content/types.js";
import { applySeo } from "@shared/seo/apply-seo.js";
import type { DocArticleProps } from "@entities/doc-article/types/doc-article.types.js";

const docContentQuery = createQuery<DocDocument, { contentId: ContentId }>({
  name: "doc-content",
  queryKey: ({ contentId }) => ["doc-content", contentId] as const,
  queryFn: async ({ params }) => {
    const raw = await loadContentRaw(params.contentId);
    return parseMarkdown(raw);
  },
  staleTime: 3_600_000,
});

export type DocArticleVM = {
  props: DocArticleProps;
  query: ReturnType<typeof docContentQuery.with>;
};

export const createDocArticleModel = (props: DocArticleProps) =>
  createModel((): DocArticleVM => {
    const navItem = findNavItemByContentId(props.contentId);
    const query = docContentQuery.with(() => ({ contentId: props.contentId }));

    effect(() => {
      const doc = query.data();
      if (!doc) return;
      applySeo({
        title: doc.frontmatter.title,
        description: doc.frontmatter.description,
        path: navItem ? `/docs/${navItem.sectionSlug}/${navItem.slug}` : undefined,
      });
    });

    return {
      props,
      query,
    };
  }, "DocArticleModel");
