import { createModel } from "@echojs/hyperdom";
import { docTocStyles } from "@shared/styles/doc.js";
import { cn } from "@shared/styles/cn.js";
import type { DocTocProps, DocTocVM } from "@widgets/doc-content/types/doc-toc.types.js";

const toc = docTocStyles();

export const createDocTocModel = (props: DocTocProps) =>
  createModel((): DocTocVM => {
    return {
      props,
      navigateToEntry: (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      },
      linkClass: (level) =>
        cn(toc.link(), level === 3 ? toc.linkDepth3() : toc.linkDepth2()),
    };
  }, "DocTocModel");
