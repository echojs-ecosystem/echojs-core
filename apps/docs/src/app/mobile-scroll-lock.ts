import { effect } from "@echojs-ecosystem/framework/reactivity";
import { $mobileNavOpen } from "@widgets/docs-shell/model/mobile-nav.js";
import { $homeNavOpen } from "@widgets/site-header/model/home-mobile-nav.js";
import { $mobileSearchOpen } from "@widgets/search/model/docs-search.model.js";

let lockCount = 0;

const setLocked = (locked: boolean): void => {
  if (typeof document === "undefined") return;

  if (locked) {
    lockCount += 1;
    if (lockCount === 1) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    }
    return;
  }

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.classList.remove("overflow-hidden");
    document.body.classList.remove("overflow-hidden");
  }
};

/** Keeps the page from scrolling while mobile overlays are open. */
export const bindMobileScrollLock = (): void => {
  effect(() => {
    const locked =
      $mobileNavOpen.value() || $homeNavOpen.value() || $mobileSearchOpen.value();
    setLocked(locked);
  });
};
