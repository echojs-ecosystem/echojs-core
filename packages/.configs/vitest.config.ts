import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";
import type { ViteUserConfig, ViteUserConfigExport } from "vitest/config";

import { echoPackageSrcAliases } from "@echojs/oxc-config/package-aliases";

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
    "@echojs/core": resolve(fromDir, "../core/src/index.ts"),
    "@echojs/reactivity": resolve(fromDir, "../reactivity/src/index.ts"),
    "@echojs/hyperdom": resolve(fromDir, "../hyperdom/src/index.ts"),
    "@echojs/router": resolve(fromDir, "../router/src/index.ts"),
    "@echojs/store": resolve(fromDir, "../store/src/index.ts"),
    "@echojs/persist": resolve(fromDir, "../persist/src/index.ts"),
    "@echojs/form": resolve(fromDir, "../form/src/index.ts"),
    "@echojs/ui": resolve(fromDir, "../ui/src/index.ts"),
    "@echojs/ui/button": resolve(fromDir, "../ui/src/components/button/index.ts"),
    "@echojs/ui/icon-button": resolve(fromDir, "../ui/src/components/icon-button/index.ts"),
    "@echojs/ui/input": resolve(fromDir, "../ui/src/components/input/index.ts"),
    "@echojs/ui/input-mask": resolve(fromDir, "../ui/src/components/input-mask/index.ts"),
    "@echojs/ui/input-otp": resolve(fromDir, "../ui/src/components/input-otp/index.ts"),
    "@echojs/ui/input-tags": resolve(fromDir, "../ui/src/components/input-tags/index.ts"),
    "@echojs/ui/textarea": resolve(fromDir, "../ui/src/components/textarea/index.ts"),
    "@echojs/ui/label": resolve(fromDir, "../ui/src/components/label/index.ts"),
    "@echojs/ui/field": resolve(fromDir, "../ui/src/components/field/index.ts"),
    "@echojs/ui/checkbox": resolve(fromDir, "../ui/src/components/checkbox/index.ts"),
    "@echojs/ui/provider": resolve(fromDir, "../ui/src/providers/index.ts"),
    "@echojs/ui/theme": resolve(fromDir, "../ui/src/theme/index.ts"),
    "@echojs/ui/core": resolve(fromDir, "../ui/src/core/index.ts"),
    "@echojs/ui/utils": resolve(fromDir, "../ui/src/utils/index.ts"),
    "@echojs/ui/primitives": resolve(fromDir, "../ui/src/primitives/index.ts"),
    "@echojs/url-state": resolve(fromDir, "../url-state/src/index.ts"),
    "@echojs/devtools-core": resolve(fromDir, "../devtools-core/src/index.ts"),
    "@echojs/i18n": resolve(fromDir, "../i18n/src/index.ts"),
    "@echojs/architect": resolve(fromDir, "../architect/src/index.ts"),
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
