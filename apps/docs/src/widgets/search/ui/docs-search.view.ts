import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { div, input, li, p, ul } from "@echojs-ecosystem/hyperdom";
import { NavLink } from "@echojs-ecosystem/router/hyperdom";
import { searchStyles } from "@widgets/search/ui/docs-search.view.styles.js";
import type { DocsSearchVM } from "@widgets/search/model/docs-search.model.js";

const search = searchStyles();

export const DocsSearchView = createView((vm: DocsSearchVM): Child => {
  return div({ class: search.root() }, [
    input({
      type: "search",
      placeholder: "Search docs…",
      class: search.input(),
      onInput: vm.onInput,
      onFocus: vm.onFocus,
      onBlur: vm.onBlur,
    }),
    () =>
      vm.showDropdown()
        ? div({ class: search.dropdown() }, [
            ul({ class: search.list() }, [
              ...vm.results().map((entry) => {
                const page = vm.pageForEntry(entry);
                if (!page) return null;
                return li(null, [
                  NavLink({
                    to: page,
                    class: search.item(),
                    children: [
                      p({ class: search.itemTitle() }, entry.title),
                      p({ class: search.itemMeta() }, `${entry.section} · ${entry.kind}`),
                    ],
                  }),
                ]);
              }),
            ]),
          ])
        : null,
  ]);
}, "DocsSearchView");
