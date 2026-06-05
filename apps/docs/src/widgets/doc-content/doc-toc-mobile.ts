import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { createComponent } from "@echojs-ecosystem/framework/hyperdom";
import type { DocTocEntry } from "@core/content/extract-toc.js";
import { createDocTocMobileModel } from "@widgets/doc-content/model/doc-toc-mobile.model.js";
import { DocTocMobileView } from "@widgets/doc-content/ui/doc-toc-mobile.view.js";

export const DocTocMobile = (entries: DocTocEntry[]): Child | null => {
  if (entries.length === 0) return null;
  return createComponent(createDocTocMobileModel({ entries }), DocTocMobileView, {
    name: "DocTocMobile",
  })();
};
