import { signal } from "@echojs-ecosystem/reactivity";

export const $mobileNavOpen = signal(false);

export const openMobileNav = (): void => $mobileNavOpen.set(true);
export const closeMobileNav = (): void => $mobileNavOpen.set(false);
export const toggleMobileNav = (): void => $mobileNavOpen.update((v) => !v);
