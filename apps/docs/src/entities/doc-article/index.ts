import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { createComponent } from "@echojs-ecosystem/framework/hyperdom";
import { createDocArticleModel } from "@entities/doc-article/model/doc-article.model.js";
import type { DocArticleProps } from "@entities/doc-article/types/doc-article.types.js";
import { DocArticleView } from "@entities/doc-article/ui/doc-article.view.js";

export {
  createDocArticleModel,
  type DocArticleVM,
  type DocContentPayload,
} from "@entities/doc-article/model/doc-article.model.js";
export type { DocArticleProps } from "@entities/doc-article/types/doc-article.types.js";
export { DocArticleView } from "@entities/doc-article/ui/doc-article.view.js";

export const DocArticle = (props: DocArticleProps): Child =>
  createComponent(createDocArticleModel(props), DocArticleView, { name: "DocArticle" })();
