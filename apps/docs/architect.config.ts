import {
  abstraction,
  defineConfig,
  dependenciesDirection,
  noUnabstractionFiles,
  publicAbstraction,
  restrictCrossImports,
} from "@echojs/architect";

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
        "*.ts": abstraction("provider"),
        "index.ts": abstraction("public-api"),
      },
      rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
    }),
    styles: abstraction("styles"),
    "main.ts": abstraction("entry"),
    "bootstrap.ts": abstraction("entry"),
  },
  rules: [noUnabstractionFiles()],
});

/** `pages/<name>/` — `*.page.ts` is the route entry; `index.ts` re-exports. */
const pageSlice = abstraction({
  name: "page",
  children: {
    "*.page.ts": abstraction("page"),
    "*.page.styles.ts": abstraction("page-styles"),
    "*.layout.ts": abstraction("layout"),
    "*.layout.styles.ts": abstraction("layout-styles"),
    "index.ts": abstraction("public-api"),
  },
  rules: [
    publicAbstraction("page"),
    publicAbstraction("public-api"),
    noUnabstractionFiles(),
  ],
});

/** `widgets/` / `features/` */
const widgetSlice = abstraction({
  name: "slice",
  children: {
    model: abstraction("model"),
    ui: abstraction("ui"),
    types: abstraction("types"),
    constants: abstraction("constants"),
    helpers: abstraction("helpers"),
    playgrounds: abstraction("playgrounds"),
    icons: abstraction("icons"),
    "*.ts": abstraction("module"),
    "*.styles.ts": abstraction("styles"),
    "index.ts": abstraction("public-api"),
  },
  rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
});

/** `entities/<name>/` — MV slice */
const entitySlice = abstraction({
  name: "slice",
  children: {
    model: abstraction("model"),
    ui: abstraction("ui"),
    helpers: abstraction("helpers"),
    types: abstraction("types"),
    constants: abstraction("constants"),
    "index.ts": abstraction("public-api"),
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
        ["app", "pages", "entities", "widgets", "features", "shared"],
        {
          allowDownward: ["**/app/router/**", "**/app/providers/**"],
        },
      ),
    ],
  }),
});
