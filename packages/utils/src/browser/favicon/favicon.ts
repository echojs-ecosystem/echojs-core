import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";

const getFaviconLink = (doc: Document): HTMLLinkElement => {
  let link = doc.querySelector<HTMLLinkElement>('link[rel*="icon"]');
  if (!link) {
    link = doc.createElement("link");
    link.rel = "icon";
    doc.head.appendChild(link);
  }
  return link;
};

export const favicon = (initialHref = "") => {
  const scope = createCleanupScope();
  const previousHref =
    isClient && defaultDocument ? (getFaviconLink(defaultDocument).href ?? "") : "";

  const $href = signal(initialHref);

  const apply = (href: string) => {
    $href.set(href);
    if (isClient && defaultDocument) {
      getFaviconLink(defaultDocument).href = href;
    }
  };

  if (initialHref) {
    apply(initialHref);
  }

  scope.add(() => {
    if (isClient && defaultDocument && previousHref) {
      getFaviconLink(defaultDocument).href = previousHref;
    }
  });

  return {
    value: () => $href.value(),
    set: apply,
    $href,
    dispose: () => scope.dispose(),
  };
};
