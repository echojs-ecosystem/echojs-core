import type { Child } from "@echojs/hyperdom";
import { createComponent } from "@echojs/hyperdom";
import type { DocTocEntry } from "@shared/content/extract-toc.js";
import { createDocTocModel } from "@widgets/doc-content/model/doc-toc.model.js";
import { DocTocView } from "@widgets/doc-content/ui/doc-toc.view.js";

export const DocToc = (entries: DocTocEntry[]): Child | null => {
  if (entries.length === 0) return null;
  return createComponent(createDocTocModel({ entries }), DocTocView, { name: "DocToc" })();
};
