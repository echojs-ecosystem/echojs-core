import { signal } from "@echojs/reactivity";
import type { Signal } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";
import type { AnyPage } from "@echojs/router";
import { docPageByContentId } from "@entities/__routes__/doc-pages.js";
import { homePage } from "@pages/home/home.page.js";
import { searchDocs, type SearchEntry } from "@shared/search/search-index.js";

export type DocsSearchVM = {
  $query: Signal<string>;
  $open: Signal<boolean>;
  results: () => SearchEntry[];
  pageForEntry: (entry: SearchEntry) => AnyPage | null;
  onInput: (e: Event) => void;
  onFocus: () => void;
  onBlur: () => void;
  showDropdown: () => boolean;
};

export const createDocsSearchModel = createModel((): DocsSearchVM => {
  const $query = signal("");
  const $open = signal(false);

  return {
    $query,
    $open,
    results: () => searchDocs($query.value()),
    pageForEntry: (entry) => {
      if (entry.id === "home") return homePage;
      return docPageByContentId[entry.id] ?? null;
    },
    onInput: (e) => {
      const value = (e.target as HTMLInputElement).value;
      $query.set(value);
      $open.set(value.length > 0);
    },
    onFocus: () => {
      if ($query.value().length > 0) $open.set(true);
    },
    onBlur: () => setTimeout(() => $open.set(false), 150),
    showDropdown: () => $open.value() && searchDocs($query.value()).length > 0,
  };
}, "DocsSearchModel");
