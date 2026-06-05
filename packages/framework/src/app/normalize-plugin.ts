import { createRouterProvider, isRouterLike } from "@echojs-ecosystem/router";

import type { EchoProvider, EchoRouterSource, EchoUseInput } from "./types";

export const normalizeEchoProvider = (input: EchoUseInput): EchoProvider => {
  if (isRouterLike(input)) {
    return createRouterProvider(input) as EchoProvider;
  }
  return input as EchoProvider;
};

/** @deprecated Use {@link normalizeEchoProvider} */
export const normalizeEchoPlugin = normalizeEchoProvider;

export const isEchoRouter = (value: unknown): value is EchoRouterSource => isRouterLike(value);
