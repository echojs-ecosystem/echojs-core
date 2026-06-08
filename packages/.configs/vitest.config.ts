import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";
import type { ViteUserConfig, ViteUserConfigExport } from "vitest/config";

import { echoPackageSrcAliases } from "@echojs-ecosystem/oxc-config/package-aliases";

export const sharedVitestConfig = defineConfig({
  test: {
    globals: true,
    include: ["__tests__/**/*.test.ts", "src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});

export const echoWorkspaceAliases = (fromDir: string): NonNullable<ViteUserConfig["resolve"]>["alias"] => {
  return {
    "@echojs-ecosystem/core": resolve(fromDir, "../core/src/index.ts"),
    "@echojs-ecosystem/reactivity": resolve(fromDir, "../reactivity/src/index.ts"),
    "@echojs-ecosystem/hyperdom": resolve(fromDir, "../hyperdom/src/index.ts"),
    "@echojs-ecosystem/router": resolve(fromDir, "../router/src/index.ts"),
    "@echojs-ecosystem/store": resolve(fromDir, "../store/src/index.ts"),
    "@echojs-ecosystem/persist": resolve(fromDir, "../persist/src/index.ts"),
    "@echojs-ecosystem/form": resolve(fromDir, "../form/src/index.ts"),
    "@echojs-ecosystem/ui": resolve(fromDir, "../ui/src/index.ts"),
    "@echojs-ecosystem/ui/button": resolve(fromDir, "../ui/src/components/button/index.ts"),
    "@echojs-ecosystem/ui/icon-button": resolve(fromDir, "../ui/src/components/icon-button/index.ts"),
    "@echojs-ecosystem/ui/input": resolve(fromDir, "../ui/src/components/input/index.ts"),
    "@echojs-ecosystem/ui/input-mask": resolve(fromDir, "../ui/src/components/input-mask/index.ts"),
    "@echojs-ecosystem/ui/input-otp": resolve(fromDir, "../ui/src/components/input-otp/index.ts"),
    "@echojs-ecosystem/ui/input-tags": resolve(fromDir, "../ui/src/components/input-tags/index.ts"),
    "@echojs-ecosystem/ui/textarea": resolve(fromDir, "../ui/src/components/textarea/index.ts"),
    "@echojs-ecosystem/ui/label": resolve(fromDir, "../ui/src/components/label/index.ts"),
    "@echojs-ecosystem/ui/field": resolve(fromDir, "../ui/src/components/field/index.ts"),
    "@echojs-ecosystem/ui/checkbox": resolve(fromDir, "../ui/src/components/checkbox/index.ts"),
    "@echojs-ecosystem/ui/provider": resolve(fromDir, "../ui/src/providers/index.ts"),
    "@echojs-ecosystem/ui/theme": resolve(fromDir, "../ui/src/theme/index.ts"),
    "@echojs-ecosystem/ui/core": resolve(fromDir, "../ui/src/core/index.ts"),
    "@echojs-ecosystem/ui/utils": resolve(fromDir, "../ui/src/utils/index.ts"),
    "@echojs-ecosystem/ui/primitives": resolve(fromDir, "../ui/src/primitives/index.ts"),
    "@echojs-ecosystem/url-state": resolve(fromDir, "../url-state/src/index.ts"),
    "@echojs-ecosystem/devtools": resolve(fromDir, "../devtools/src/index.ts"),
    "@echojs-ecosystem/i18n": resolve(fromDir, "../i18n/src/index.ts"),
    "@echojs-ecosystem/architect": resolve(fromDir, "../architect/src/index.ts"),
    "@echojs-ecosystem/permission": resolve(fromDir, "../permission/src/index.ts"),
    "@echojs-ecosystem/network/http": resolve(fromDir, "../network/src/http/index.ts"),
    "@echojs-ecosystem/network/ws": resolve(fromDir, "../network/src/ws/index.ts"),
    "@echojs-ecosystem/network/mock": resolve(fromDir, "../network/src/mock/index.ts"),
    "@echojs-ecosystem/network/graphql": resolve(fromDir, "../network/src/graphql/index.ts"),
  };
};

type EchoEnvironmentMatchGlob = [string, string];

type EchoVitestOverrides = Omit<ViteUserConfig, "test"> & {
  test?: (NonNullable<ViteUserConfig["test"]> & { environmentMatchGlobs?: EchoEnvironmentMatchGlob[] }) | undefined;
};

export const echoVitestConfig = (
  fromDir: string,
  overrides: EchoVitestOverrides = {},
): ViteUserConfigExport => {
  return mergeConfig(
    sharedVitestConfig,
    mergeConfig(
      defineConfig({
        resolve: {
          alias: {
            ...echoWorkspaceAliases(fromDir),
            ...echoPackageSrcAliases(fromDir),
          },
        },
      }),
      defineConfig(overrides as ViteUserConfig),
    ),
  );
};

export default sharedVitestConfig;
