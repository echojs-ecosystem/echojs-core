import { createModel } from "@echojs-ecosystem/framework/hyperdom";
import { signal } from "@echojs-ecosystem/framework/reactivity";
import type { DocTocEntry } from "@core/content/extract-toc.js";
import { cn } from "@core/styles/cn.js";
import { docTocMobileStyles } from "@widgets/doc-content/ui/doc-toc-mobile.view.styles.js";

const toc = docTocMobileStyles();

export type DocTocMobileProps = {
  entries: DocTocEntry[];
};

export type DocTocMobileVM = {
  props: DocTocMobileProps;
  $open: ReturnType<typeof signal<boolean>>;
  toggle: () => void;
  navigateToEntry: (id: string) => void;
  linkClass: (level: number) => string;
  chevronClass: () => string;
};

export const createDocTocMobileModel = (props: DocTocMobileProps) =>
  createModel((): DocTocMobileVM => {
    const $open = signal(false);

    return {
      props,
      $open,
      toggle: () => $open.update((value) => !value),
      navigateToEntry: (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        $open.set(false);
      },
      linkClass: (level) => cn(toc.link(), level === 3 && toc.linkDepth3()),
      chevronClass: () => cn(toc.toggleChevron(), $open.value() && toc.toggleChevronOpen()),
    };
  }, "DocTocMobileModel");
