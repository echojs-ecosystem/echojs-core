import type { AnyPage } from "@echojs/router";
import { allDocsNavItems } from "@shared/content/nav.js";
import type { ContentId } from "@shared/content/types.js";
import { createDocPage } from "@shared/content/create-doc-page.js";

const cache = new Map<ContentId, AnyPage>();

export const getDocPage = (contentId: ContentId): AnyPage => {
  let page = cache.get(contentId);
  if (!page) {
    page = createDocPage(contentId);
    cache.set(contentId, page);
  }
  return page;
};

export const docPageByContentId: Record<string, AnyPage> = Object.fromEntries(
  allDocsNavItems.map((item) => [item.contentId, getDocPage(item.contentId)]),
);
