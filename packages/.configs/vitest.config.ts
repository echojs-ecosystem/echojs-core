import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";
import type { ViteUserConfig, ViteUserConfigExport } from "vitest/config";

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
    "@echojs/url-state": resolve(fromDir, "../url-state/src/index.ts"),
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
        resolve: { alias: echoWorkspaceAliases(fromDir) },
      }),
      defineConfig(overrides as ViteUserConfig),
    ),
  );
};

export default sharedVitestConfig;
