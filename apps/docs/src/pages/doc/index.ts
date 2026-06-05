import type { Child } from "@echojs/hyperdom";
import { createComponent } from "@echojs/hyperdom";
import { createDocArticleModel } from "@pages/doc/model/doc-article.model.js";
import type { DocArticleProps } from "@pages/doc/types/doc-article.types.js";
import { DocArticleView } from "@pages/doc/ui/doc-article.view.js";

export { createDocArticleModel, type DocArticleVM } from "@pages/doc/model/doc-article.model.js";
export type { DocArticleProps } from "@pages/doc/types/doc-article.types.js";
export { DocArticleView } from "@pages/doc/ui/doc-article.view.js";

export const DocArticle = (props: DocArticleProps): Child =>
  createComponent(createDocArticleModel(props), DocArticleView, { name: "DocArticle" })();
