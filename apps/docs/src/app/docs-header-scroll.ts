import { signal } from "@echojs-ecosystem/framework/reactivity";

const SCROLL_THRESHOLD = 8;

export const $docsHeaderScrolled = signal(false);

let bound = false;

export const bindDocsHeaderScroll = (): void => {
  if (bound || typeof window === "undefined") return;
  bound = true;

  const sync = (): void => $docsHeaderScrolled.set(window.scrollY > SCROLL_THRESHOLD);
  sync();
  window.addEventListener("scroll", sync, { passive: true });
};
