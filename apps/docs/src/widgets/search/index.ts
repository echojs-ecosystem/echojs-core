import { createComponent } from "@echojs/hyperdom";
import { createDocsSearchModel } from "@widgets/search/model/docs-search.model.js";
import { DocsSearchView } from "@widgets/search/ui/docs-search.view.js";

export const DocsSearch = createComponent(createDocsSearchModel, DocsSearchView, {
  name: "DocsSearch",
});
