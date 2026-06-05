import {
  abstraction,
  defineConfig,
  getFlattenFiles,
  getNodesRecord,
  noUnabstractionFiles,
  publicAbstraction,
  restrictCrossImports,
  rule,
  type Diagnostic,
} from "@echojs/architect";

const isRouterImport = (path: string) => /[/\\]app[/\\]router[/\\]/.test(path);

/** Layer order with `app/router` importable from any layer below `app`. */
const dependenciesDirection = (
  order: string[],
  allowDownward?: (dependencyPath: string) => boolean,
) =>
  rule({
    name: "echo/dependencies-direction",
    severity: "error",
    check: async ({ root, instance, dependenciesMap }) => {
      const diagnostics: Diagnostic[] = [];
      const nodesRecord = getNodesRecord(root);

      const childFilesEntires = instance.children.flatMap((childInstance) => {
        const instanceNode = nodesRecord[childInstance.path];
        const files = getFlattenFiles(instanceNode);

        return files.map((file) => [file.path, childInstance] as const);
      });

      const childFilesIndex = Object.fromEntries(childFilesEntires);

      for (const [path, fileInstance] of childFilesEntires) {
        const dependencies = dependenciesMap.dependencies[path];
        const instanceNameIndex = order.indexOf(fileInstance.abstraction.name);

        for (const dependency of dependencies ?? []) {
          if (allowDownward?.(dependency)) {
            continue;
          }

          const dependencyInstance = childFilesIndex[dependency];
          if (dependencyInstance === undefined) {
            continue;
          }

          const dependencyInstanceNameIndex = order.indexOf(
            dependencyInstance.abstraction.name,
          );

          if (dependencyInstanceNameIndex < instanceNameIndex) {
            diagnostics.push({
              message: `Forbidden dependency "${fileInstance.abstraction.name}" <= "${dependencyInstance.abstraction.name}".
allowed dependencies order: ${order.join(" <= ")}`,
              location: { path },
            });
          }
        }
      }

      return { diagnostics };
    },
  });

/** `app/` — shell: entrypoints, router tables, providers, global styles. */
const appLayer = abstraction({
  name: "app",
  children: {
    router: abstraction({
      name: "router",
      children: {
        "*.ts": abstraction("routes-module"),
      },
      rules: [noUnabstractionFiles()],
    }),
    providers: abstraction({
      name: "providers",
      children: {
        "index.ts": abstraction("public-api"),
        "*.ts": abstraction("provider"),
      },
      rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
    }),
    styles: abstraction("styles"),
    "main.ts": abstraction("entry"),
    "bootstrap.ts": abstraction("entry"),
  },
  rules: [noUnabstractionFiles()],
});

/** `pages/<name>/` — route entry + optional layout, public `index.ts`. */
const pageSlice = abstraction({
  name: "page",
  children: {
    "index.ts": abstraction("public-api"),
    "*.page.ts": abstraction("page"),
    "*.page.styles.ts": abstraction("page-styles"),
    "*.layout.ts": abstraction("layout"),
    "*.layout.styles.ts": abstraction("layout-styles"),
  },
  rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
});

/** `widgets/` / `features/` — composite UI with optional playgrounds & root modules. */
const widgetSlice = abstraction({
  name: "slice",
  children: {
    "index.ts": abstraction("public-api"),
    model: abstraction("model"),
    ui: abstraction("ui"),
    types: abstraction("types"),
    helpers: abstraction("helpers"),
    playgrounds: abstraction("playgrounds"),
    icons: abstraction("icons"),
    "*.ts": abstraction("module"),
    "*.styles.ts": abstraction("styles"),
  },
  rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
});

/**
 * `entities/<name>/` — MV slice.
 * `model/` holds `*.model.ts`, `*.validation.ts`, `*.types.ts`, `*.constants.ts`.
 * `ui/` holds `*.view.ts`, `*.styles.ts`, `*.view.styles.ts`.
 */
const entitySlice = abstraction({
  name: "slice",
  children: {
    "index.ts": abstraction("public-api"),
    model: abstraction("model"),
    ui: abstraction("ui"),
    helpers: abstraction("helpers"),
    types: abstraction("types"),
    constants: abstraction("constants"),
  },
  rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
});

export default defineConfig({
  baseUrl: "src",
  ignores: ["**/*.md", "**/*.css", "**/*.json", "**/*.html"],
  root: abstraction({
    name: "src",
    children: {
      app: appLayer,
      pages: abstraction({
        name: "pages",
        children: { "*": pageSlice },
        rules: [restrictCrossImports()],
      }),
      widgets: abstraction({
        name: "widgets",
        children: { "*": widgetSlice },
        rules: [restrictCrossImports()],
      }),
      features: abstraction({
        name: "features",
        children: { "*": widgetSlice },
        rules: [restrictCrossImports()],
      }),
      entities: abstraction({
        name: "entities",
        children: { "*": entitySlice },
      }),
      shared: abstraction({
        name: "shared",
        children: { "**/*": abstraction("shared-module") },
      }),
      content: abstraction("content"),
    },
    rules: [
      dependenciesDirection(
        ["app", "pages", "widgets", "features", "entities", "shared"],
        isRouterImport,
      ),
    ],
  }),
});
