import { signal } from "@echojs-ecosystem/framework/reactivity";

export const $homeNavOpen = signal(false);

export const openHomeNav = (): void => $homeNavOpen.set(true);
export const closeHomeNav = (): void => $homeNavOpen.set(false);
export const toggleHomeNav = (): void => $homeNavOpen.update((open) => !open);
