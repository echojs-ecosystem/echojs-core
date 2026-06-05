import type { AnyPage } from "@echojs-ecosystem/framework/router";
import { allDocsNavItems } from "@core/content/nav.js";
import type { ContentId } from "@core/content/types.js";
import { createDocPage } from "@pages/doc/doc.page.js";

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
