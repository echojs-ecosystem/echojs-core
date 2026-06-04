import type { EchoProvider } from "./types";

/** Identity helper for app-level providers (i18n, router, …). */
export const defineProvider = <T extends EchoProvider>(provider: T): T => provider;

/** @deprecated Use {@link defineProvider} */
export const definePlugin = defineProvider;
