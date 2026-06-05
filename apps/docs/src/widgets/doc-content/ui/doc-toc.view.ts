import { createView, type Child } from "@echojs/hyperdom";
import { div, h, nav, p } from "@echojs/hyperdom";
import { docTocStyles } from "@widgets/doc-content/ui/doc-toc.view.styles.js";
import type { DocTocVM } from "@widgets/doc-content/types/doc-toc.types.js";

const toc = docTocStyles();

export const DocTocView = createView((vm: DocTocVM): Child => {
  const { entries } = vm.props;
  if (entries.length === 0) return null;

  return nav({ class: toc.root(), "aria-label": "On this page" }, [
    p({ class: toc.title() }, "On this page"),
    div({ class: toc.list() }, [
      ...entries.map((entry) =>
        h(
          "a",
          {
            href: `#${entry.id}`,
            class: vm.linkClass(entry.level),
            onClick: (e: MouseEvent) => {
              e.preventDefault();
              vm.navigateToEntry(entry.id);
            },
          },
          entry.text,
        ),
      ),
    ]),
  ]);
}, "DocTocView");
