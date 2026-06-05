import { createRouteView } from "@echojs/router";
import { DocArticle } from "@pages/doc/index.js";
import type { ContentId } from "./types.js";

/** Route view is eager; markdown body loads lazily inside {@link DocArticle}. */
export const createDocPage = (contentId: ContentId) =>
  createRouteView({
    name: `docs-${contentId.replace(/\//g, "-")}`,
    view: () => DocArticle({ contentId }),
  });
