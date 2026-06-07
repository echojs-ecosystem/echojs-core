import { createModel } from "@echojs-ecosystem/framework/hyperdom";
import { signal } from "@echojs-ecosystem/framework/reactivity";
import { cn } from "@core/styles/cn.js";
import type { DocTocProps } from "@widgets/doc-content/types/doc-toc.types.js";
import { docTocMobileStyles } from "@widgets/doc-content/ui/doc-toc-mobile.view.styles.js";

const toc = docTocMobileStyles();

export type DocTocMobileProps = DocTocProps;

export type DocTocMobileVM = {
  props: DocTocMobileProps;
  $open: ReturnType<typeof signal<boolean>>;
  toggle: () => void;
  navigateToEntry: (id: string) => void;
  linkClass: (level: number, id: string) => string;
  chevronClass: () => string;
};

export const createDocTocMobileModel = (props: DocTocMobileProps) =>
  createModel((): DocTocMobileVM => {
    const $open = signal(false);
    const { isActive, setActiveId } = props;

    return {
      props,
      $open,
      toggle: () => $open.update((value) => !value),
      navigateToEntry: (id) => {
        setActiveId(id);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        $open.set(false);
      },
      linkClass: (level, id) =>
        cn(toc.link(), level === 3 && toc.linkDepth3(), isActive(id) && toc.linkActive()),
      chevronClass: () => cn(toc.toggleChevron(), $open.value() && toc.toggleChevronOpen()),
    };
  }, "DocTocMobileModel");
