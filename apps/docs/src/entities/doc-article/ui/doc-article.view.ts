import { createView, type Child } from "@echojs/hyperdom";
import { div, p, Show } from "@echojs/hyperdom";
import { extractDocToc } from "@core/content/extract-toc.js";
import {
  docArticlePageStyles,
  docLayoutStyles,
  skeletonStyles,
} from "@entities/doc-article/ui/doc-article.view.styles.js";
import { routerStateStyles } from "@entities/router-states/ui/router-states.view.styles.js";
import { DocRenderer } from "@widgets/doc-content/doc-renderer.js";
import { DocToc } from "@widgets/doc-content/doc-toc.js";
import { DocPager } from "@widgets/doc-pager/index.js";
import type { DocArticleVM } from "@entities/doc-article/model/doc-article.model.js";

const layout = docArticlePageStyles();
const articleLayout = docLayoutStyles();
const skeleton = skeletonStyles();
const state = routerStateStyles();

export const DocArticleView = createView((vm: DocArticleVM): Child => {
  const { query } = vm;

  return div({ class: layout.docPage() }, [
    Show(
      () => query.isPending(),
      () =>
        div({ class: skeleton.root() }, [
          div({ class: skeleton.title() }),
          div({ class: skeleton.line() }),
          div({ class: skeleton.lineShort() }),
        ]),
      () =>
        Show(
          () => query.isError(),
          () => p({ class: state.error() }, () => String(query.error() ?? "Failed to load content")),
          () => {
            const doc = query.data();
            if (!doc) return null;
            const toc = extractDocToc(doc);
            return div({ class: articleLayout.article() }, [
              div({ class: articleLayout.main() }, [
                div({ class: articleLayout.mainInner() }, [
                  DocRenderer(doc),
                  DocPager(vm.props.contentId),
                ]),
              ]),
              div({ class: articleLayout.tocAside() }, [
                div({ class: articleLayout.tocSticky() }, [DocToc(toc)]),
              ]),
            ]);
          },
        ),
    ),
  ]);
}, "DocArticleView");
