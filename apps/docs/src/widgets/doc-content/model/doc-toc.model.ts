import { createModel } from "@echojs-ecosystem/framework/hyperdom";
import { docTocStyles } from "@widgets/doc-content/ui/doc-toc.view.styles.js";
import { cn } from "@core/styles/cn.js";
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
