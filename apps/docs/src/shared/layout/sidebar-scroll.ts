import { effect } from "@echojs/reactivity";
import { appRouter } from "@entities/__routes__/router.js";

const STORAGE_KEY = "echojs:docs-sidebar-scroll";
const ACTIVE_LINK_SELECTOR = "a[aria-current='page']";

let memoryScroll = 0;
let navEl: HTMLElement | null = null;
let lastAlignedPath = "";
let alignEffectBound = false;

const onScroll = (): void => {
  if (!navEl) return;
  persistSidebarScroll(navEl.scrollTop);
};

export const readSidebarScroll = (): number => {
  if (typeof window === "undefined") return memoryScroll;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (Number.isFinite(n) && n >= 0) return n;
    }
  } catch {
    /* ignore */
  }
  return memoryScroll;
};

export const persistSidebarScroll = (top: number): void => {
  memoryScroll = top;
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, String(top));
  } catch {
    /* ignore */
  }
};

/** True when the active link sits near the vertical center of the nav viewport. */
const isActiveLinkCentered = (link: HTMLElement): boolean => {
  if (!navEl) return true;
  const navRect = navEl.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const linkCenter = linkRect.top + linkRect.height / 2;
  const navCenter = navRect.top + navEl.clientHeight / 2;
  return Math.abs(linkCenter - navCenter) <= Math.max(24, navEl.clientHeight * 0.2);
};

/** Scroll nav so the active link is vertically centered (not pinned to the bottom). */
const scrollActiveLinkToCenter = (link: HTMLElement, behavior: ScrollBehavior): void => {
  if (!navEl) return;
  const navRect = navEl.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const linkCenter = linkRect.top + linkRect.height / 2;
  const navCenter = navRect.top + navEl.clientHeight / 2;
  const delta = linkCenter - navCenter;
  if (Math.abs(delta) < 2) return;
  navEl.scrollBy({ top: delta, behavior });
};

/** Scroll the sidebar so the active doc link is visible (after route changes). */
export const alignSidebarScrollToActiveLink = (behavior: ScrollBehavior = "instant"): void => {
  if (!navEl) return;

  const path = appRouter.$path.value();
  const active = navEl.querySelector<HTMLElement>(ACTIVE_LINK_SELECTOR);
  if (!active) {
    lastAlignedPath = path;
    return;
  }

  if (path === lastAlignedPath && isActiveLinkCentered(active)) return;

  lastAlignedPath = path;
  scrollActiveLinkToCenter(active, behavior);
  persistSidebarScroll(navEl.scrollTop);
};

const bindSidebarAlignEffect = (): void => {
  if (alignEffectBound) return;
  alignEffectBound = true;

  effect(() => {
    appRouter.$path.value();
    appRouter.$activePage.value();
    queueMicrotask(() => {
      requestAnimationFrame(() => alignSidebarScrollToActiveLink("instant"));
    });
  });
};

/** Bind the scrollable `<nav>`. Keeps manual scroll on the same page; aligns on navigation. */
export const sidebarScrollRef = (el: HTMLElement | null): void => {
  if (navEl) {
    persistSidebarScroll(navEl.scrollTop);
    navEl.removeEventListener("scroll", onScroll);
  }

  navEl = el;
  if (!el) return;

  el.addEventListener("scroll", onScroll, { passive: true });
  bindSidebarAlignEffect();
  queueMicrotask(() => {
    requestAnimationFrame(() => alignSidebarScrollToActiveLink("instant"));
  });
};
