import type { StructureCodePanel } from '@entities/home/constants/home-structure.types'

const panel = (
  id: string,
  file: string,
  code: string,
  caption: string,
  badge = 'TypeScript',
  lang = 'typescript'
): StructureCodePanel => ({ id, file, badge, lang, code, caption })

/** Explorer code — full EchoJS app walkthrough. */
export const structurePanelById: Record<string, StructureCodePanel> = {
  pkg: panel(
    'pkg',
    'package.json',
    `{
  "name": "echojs-app",
  "type": "module",
  "dependencies": {
    "@echojs-ecosystem/framework": "^0.6.0",
    "@echojs-ecosystem/reactivity": "^0.6.0",
    "@echojs-ecosystem/hyperdom": "^0.6.0",
    "@echojs-ecosystem/router": "^0.6.0",
    "@echojs-ecosystem/async": "^0.6.0",
    "@echojs-ecosystem/store": "^0.6.0",
    "@echojs-ecosystem/url-state": "^0.6.0",
    "@echojs-ecosystem/persist": "^0.6.0",
    "@echojs-ecosystem/ui": "^0.6.0",
    "@echojs-ecosystem/i18n": "^0.6.0",
    "@echojs-ecosystem/form": "^0.6.0",
    "@echojs-ecosystem/permission": "^0.6.0",
    "@echojs-ecosystem/network-http": "^0.6.0",
    "@echojs-ecosystem/utils": "^0.6.0"
  }
}`,
    'One platform — compose only the packages you need',
    'JSON',
    'json'
  ),
  index: panel(
    'index',
    'index.html',
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EchoJS App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/app/main.ts"></script>
  </body>
</html>`,
    'Mount target #app — entry script loads main.ts as ESM',
    'HTML',
    'html'
  ),
  vite: panel(
    'vite',
    'vite.config.ts',
    `import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@app": resolve(__dirname, "src/app"),
      "@pages": resolve(__dirname, "src/pages"),
      "@widgets": resolve(__dirname, "src/widgets"),
      "@features": resolve(__dirname, "src/features"),
      "@entities": resolve(__dirname, "src/entities"),
      "@core": resolve(__dirname, "src/core"),
    },
  },
})`,
    'Vite aliases mirror FSD layers — same paths as tsconfig'
  ),
  architect: panel(
    'architect',
    'architect.config.ts',
    `import {
  abstraction,
  defineConfig,
  dependenciesDirection,
  noUnabstractionFiles,
  publicAbstraction,
  restrictCrossImports,
} from "@echojs-ecosystem/architect"

const coreModule = (name: string) =>
  abstraction({
    name,
    children: {
      "*.ts": abstraction("module"),
      "index.ts": abstraction("public-api"),
    },
    rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
  })

const pageSlice = abstraction({
  name: "page",
  children: {
    "*.page.ts": abstraction("page"),
    "*.layout.ts": abstraction("layout"),
    "index.ts": abstraction("public-api"),
    model: abstraction("model"),
    view: abstraction("view"),
    component: abstraction("component"),
  },
  rules: [
    publicAbstraction("page"),
    publicAbstraction("public-api"),
    noUnabstractionFiles(),
  ],
})

const featureSlice = abstraction({
  name: "slice",
  children: {
    model: abstraction("model"),
    view: abstraction("view"),
    component: abstraction("component"),
    "index.ts": abstraction("public-api"),
  },
  rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
})

export default defineConfig({
  baseUrl: "src",
  ignores: ["**/*.md", "**/*.css", "**/*.json", "**/*.html"],
  root: abstraction({
    name: "src",
    children: {
      app: abstraction({
        name: "app",
        children: {
          router: abstraction({
            name: "router",
            children: { "*.ts": abstraction("routes-module") },
            rules: [noUnabstractionFiles()],
          }),
          providers: abstraction({
            name: "providers",
            children: {
              "index.ts": abstraction("public-api"),
            },
            rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
          }),
          "main.ts": abstraction("entry"),
          "bootstrap.ts": abstraction("entry"),
        },
        rules: [noUnabstractionFiles()],
      }),
      pages: abstraction({
        name: "pages",
        children: { "*": pageSlice, "**/*": pageSlice },
        rules: [restrictCrossImports()],
      }),
      widgets: abstraction({
        name: "widgets",
        children: { "*": featureSlice },
        rules: [restrictCrossImports()],
      }),
      features: abstraction({
        name: "features",
        children: { "*": featureSlice },
        rules: [restrictCrossImports()],
      }),
      entities: abstraction({
        name: "entities",
        children: {
          "*": abstraction({
            name: "slice",
            children: {
              api: abstraction("api"),
              model: abstraction("model"),
              view: abstraction("view"),
              component: abstraction("component"),
              "index.ts": abstraction("public-api"),
            },
            rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
          }),
        },
      }),
      core: abstraction({
        name: "core",
        children: {
          async: coreModule("async"),
          router: coreModule("router"),
          ui: coreModule("ui"),
          store: coreModule("store"),
          i18n: abstraction({
            name: "i18n",
            children: {
              "*.ts": abstraction("module"),
              "index.ts": abstraction("public-api"),
              "en.json": abstraction("locale"),
            },
            rules: [publicAbstraction("public-api"), noUnabstractionFiles()],
          }),
          api: abstraction({
            name: "api",
            children: { "**/*": abstraction("api-module") },
          }),
          permission: coreModule("permission"),
          hooks: abstraction({
            name: "hooks",
            children: { "**/*": abstraction("hook-module") },
          }),
          styles: abstraction({
            name: "styles",
            children: { "**/*": abstraction("style-module") },
          }),
        },
      }),
    },
    rules: [
      dependenciesDirection(
        ["app", "pages", "widgets", "features", "entities", "core"],
        {
          allowDownward: [
            "**/app/router/**",
            "**/core/async/**",
            "**/core/router/**",
            "**/core/ui/**",
            "**/core/store/**",
            "**/core/i18n/**",
          ],
        },
      ),
    ],
  }),
})`,
    'Architect — FSD layers, public API barrels, view/component slices, core modules'
  ),
  'app-main': panel(
    'app-main',
    'src/app/main.ts',
    `import "./styles/global.css"
import { bootstrap } from "./bootstrap"

void bootstrap()`,
    'Entry — global CSS, then async provider bootstrap'
  ),
  'app-bootstrap': panel(
    'app-bootstrap',
    'src/app/bootstrap.ts',
    `import { createEchoApp } from "@echojs-ecosystem/framework/app"
import { queryProvider } from "@core/async"
import { routerProvider } from "@core/router"
import { uiProvider } from "@core/ui"
import { i18nProvider } from "@core/i18n"
import { storeProvider } from "@core/store"

export const bootstrap = () =>
  createEchoApp({ strictContextChecks: true })
    .use(queryProvider)
    .use(storeProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(routerProvider)
    .mount("#app")`,
    'framework/app — fluent .use() for every provider'
  ),
  'app-prov-index': panel(
    'app-prov-index',
    'src/app/providers/index.ts',
    `export { queryProvider } from "@core/async"
export { routerProvider } from "@core/router"
export { uiProvider } from "@core/ui"
export { i18nProvider, i18n } from "@core/i18n"
export { storeProvider } from "@core/store"`,
    'App re-exports core wiring — views import i18n from @core/i18n'
  ),
  'routes-index': panel(
    'routes-index',
    'src/app/router/index.ts',
    `export { appRouter } from "./app.routes"
export { homePage, workspaceSection } from "@entities/__routes__"`,
    'Router barrel — route objects, not string paths'
  ),
  'routes-app': panel(
    'routes-app',
    'src/app/router/app.routes.ts',
    `import { createRoutes } from "@echojs-ecosystem/framework/router"
import { homePage } from "@pages/home/home.page"
import { workspaceSection } from "@entities/__routes__/workspace.routes"

export const appRouter = createRoutes([
  { path: "/", routeView: homePage },
  workspaceSection,
])`,
    'router — compose feature route trees from entities/__routes__'
  ),
  'routes-entity': panel(
    'routes-entity',
    'src/entities/__routes__/workspace.routes.ts',
    `import { dashboardPage } from "@pages/workspace/dashboard/dashboard.page"
import { settingsPage } from "@pages/workspace/settings/settings.page"
import { workspaceLayoutPage } from "@pages/workspace/workspace.layout"

export const workspaceSection = {
  path: "/workspace",
  name: "workspace",
  layoutView: workspaceLayoutPage,
  children: [
    { path: "/", name: "dashboard", routeView: dashboardPage },
    { path: "settings", name: "settings", routeView: settingsPage },
  ],
}`,
    'Route slices live in entities/__routes__ — reusable across apps'
  ),
  'pages-home-index': panel(
    'pages-home-index',
    'src/pages/home/index.ts',
    `export { Home } from "./component/home.component"
export { createHomeModel } from "./model/home.model"
export { HomeView } from "./view/home.view"`,
    'Public slice API — re-exports from component/, model/, view/'
  ),
  'pages-home-component': panel(
    'pages-home-component',
    'src/pages/home/component/home.component.ts',
    `import { createComponent } from "@echojs-ecosystem/framework/hyperdom"

import { createHomeModel } from "../model/home.model"
import { HomeView } from "../view/home.view"

export const Home = createComponent(createHomeModel, HomeView, {
  name: "Home",
})`,
    'createComponent lives in component/*.component.ts — not in index or page'
  ),
  'pages-home-page': panel(
    'pages-home-page',
    'src/pages/home/home.page.ts',
    `import { createRouteView } from "@echojs-ecosystem/framework/router"

import { Home } from "./component/home.component"

export const homePage = createRouteView({
  name: "home",
  view: () => Home(),
})`,
    'Page glue — route imports the wired component only'
  ),
  'pages-home-model': panel(
    'pages-home-model',
    'src/pages/home/model/home.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"
export const createHomeModel = createModel(() => ({
  heroTitle: () => "Build with EchoJS",
}), "HomeModel")`,
    'Page model — behavior only; features mount as components in the view'
  ),
  'pages-home-view': panel(
    'pages-home-view',
    'src/pages/home/view/home.view.ts',
    `import { createView, main, section } from "@echojs-ecosystem/framework/hyperdom"
import { Search } from "@features/search"

export const HomeView = createView((vm) =>
  main([
    section(vm.heroTitle()),
    Search(),
  ]),
  "HomeView",
)`,
    'hyperdom — createView maps VM → DOM, features stay imported slices'
  ),
  'ws-layout': panel(
    'ws-layout',
    'src/pages/workspace/workspace.layout.ts',
    `import { createLayoutView } from "@echojs-ecosystem/framework/router"

import { AppShellLayout } from "@widgets/app-shell"

export const workspaceLayoutPage = createLayoutView({
  name: "workspace-layout",
  view: ({ outlet }) =>
    AppShellLayout({
      sidebar: true,
      children: outlet(),
    }),
})`,
    'createLayoutView — outlet() from view context renders the active child'
  ),
  'ws-dashboard-index': panel(
    'ws-dashboard-index',
    'src/pages/workspace/dashboard/index.ts',
    `export { Dashboard } from "./component/dashboard.component"
export { createDashboardModel } from "./model/dashboard.model"
export { DashboardView } from "./view/dashboard.view"`,
    'Page slice barrel — component + model + view'
  ),
  'ws-dashboard-component': panel(
    'ws-dashboard-component',
    'src/pages/workspace/dashboard/component/dashboard.component.ts',
    `import { createComponent } from "@echojs-ecosystem/framework/hyperdom"

import { createDashboardModel } from "../model/dashboard.model"
import { DashboardView } from "../view/dashboard.view"

export const Dashboard = createComponent(
  createDashboardModel,
  DashboardView,
  { name: "Dashboard" },
)`,
    'Page component — model + view wired once'
  ),
  'ws-dashboard-page': panel(
    'ws-dashboard-page',
    'src/pages/workspace/dashboard/dashboard.page.ts',
    `import { createRouteView } from "@echojs-ecosystem/framework/router"

import { Dashboard } from "./component/dashboard.component"

export const dashboardPage = createRouteView({
  name: "workspace-dashboard",
  beforeLoad: () => dashboardStatsQuery.prefetch(),
  view: () => Dashboard(),
})`,
    'beforeLoad prefetches server state before the page mounts'
  ),
  'ws-dashboard-model': panel(
    'ws-dashboard-model',
    'src/pages/workspace/dashboard/model/dashboard.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"
import { dashboardStatsQuery } from "@entities/user/api/users.query"
import { sessionStore } from "@entities/session"

export const createDashboardModel = createModel(() => {
  const stats = dashboardStatsQuery.with()
  return {
    userName: () => sessionStore.displayName(),
    stats,
    isLoading: () => stats.isPending(),
    totalUsers: () => stats.data()?.users ?? 0,
  }
}, "DashboardModel")`,
    'async .with() in models — views read data() and isPending()'
  ),
  'ws-dashboard-view': panel(
    'ws-dashboard-view',
    'src/pages/workspace/dashboard/view/dashboard.view.ts',
    `import { createView, div, h1, Show } from "@echojs-ecosystem/framework/hyperdom"
import { Skeleton } from "@echojs-ecosystem/framework/ui"

export const DashboardView = createView((vm) =>
  div([
    h1(() => \`Hello, \${vm.userName()}\`),
    Show(
      vm.isLoading,
      () => Skeleton({ class: "h-8 w-32" }),
      () => div(() => \`\${vm.totalUsers()} users\`),
    ),
  ]),
  "DashboardView",
)`,
    'ui + Show — loading states without hook rules'
  ),
  'ws-settings-index': panel(
    'ws-settings-index',
    'src/pages/workspace/settings/index.ts',
    `export { Settings } from "./component/settings.component"
export { createSettingsModel } from "./model/settings.model"
export { SettingsView } from "./view/settings.view"`,
    'Settings slice barrel next to component/'
  ),
  'ws-settings-component': panel(
    'ws-settings-component',
    'src/pages/workspace/settings/component/settings.component.ts',
    `import { createComponent } from "@echojs-ecosystem/framework/hyperdom"

import { createSettingsModel } from "../model/settings.model"
import { SettingsView } from "../view/settings.view"

export const Settings = createComponent(
  createSettingsModel,
  SettingsView,
  { name: "Settings" },
)`,
    'Settings component — model + view wiring'
  ),
  'ws-settings-page': panel(
    'ws-settings-page',
    'src/pages/workspace/settings/settings.page.ts',
    `import { createRouteView } from "@echojs-ecosystem/framework/router"

import { Settings } from "./component/settings.component"

export const settingsPage = createRouteView({
  name: "workspace-settings",
  view: () => Settings(),
})`,
    'Sibling route under the same workspace layout'
  ),
  'ws-settings-model': panel(
    'ws-settings-model',
    'src/pages/workspace/settings/model/settings.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"
import { parseAsString, useQueryState } from "@echojs-ecosystem/url-state"

export const createSettingsModel = createModel(() => {
  const $tab = useQueryState("tab", parseAsString.withDefault("profile"))
  return {
    activeTab: () => $tab.value(),
    setTab: (tab: string) => $tab.set(tab),
  }
}, "SettingsModel")`,
    'url-state — filters and tabs synced with the URL'
  ),
  'ws-settings-view': panel(
    'ws-settings-view',
    'src/pages/workspace/settings/view/settings.view.ts',
    `import { createView, div, button } from "@echojs-ecosystem/framework/hyperdom"

import { LoginForm } from "@features/login-form"

export const SettingsView = createView((vm) =>
  div([
    ["profile", "security"].map((tab) =>
      button({
        class: () => (vm.activeTab() === tab ? "active" : ""),
        onClick: () => vm.setTab(tab),
      }, tab),
    ),
    LoginForm(),
  ]),
  "SettingsView",
)`,
    'Settings tabs driven by URL search params'
  ),
  'shell-layout': panel(
    'shell-layout',
    'src/widgets/app-shell/app-shell.layout.ts',
    `import { createView, div } from "@echojs-ecosystem/framework/hyperdom"
import { AppHeaderView } from "./view/app-header.view"
import { AppSidebarView } from "./view/app-sidebar.view"

export const AppShellLayout = createView(
  (props: { sidebar?: boolean; children: Child }) =>
    div({ class: "app-shell" }, [
      AppHeaderView(),
      props.sidebar ? AppSidebarView() : null,
      div({ class: "app-main" }, props.children),
    ]),
  "AppShellLayout",
)`,
    'widgets — composite shell reused by nested layouts'
  ),
  'shell-header': panel(
    'shell-header',
    'src/widgets/app-shell/view/app-header.view.ts',
    `import { createView, header } from "@echojs-ecosystem/framework/hyperdom"
import { NavLink } from "@echojs-ecosystem/framework/router"
import { ThemeToggle } from "@features/theme-toggle"
import { homePage, dashboardPage } from "@entities/__routes__"

export const AppHeaderView = createView(() =>
  header([
    NavLink({ to: homePage, children: "Home" }),
    NavLink({ to: dashboardPage, children: "Workspace" }),
    ThemeToggle(),
  ]),
  "AppHeaderView",
)`,
    'router NavLink + feature widgets in shared chrome'
  ),
  'shell-sidebar': panel(
    'shell-sidebar',
    'src/widgets/app-shell/view/app-sidebar.view.ts',
    `import { createView, nav } from "@echojs-ecosystem/framework/hyperdom"
import { NavLink } from "@echojs-ecosystem/framework/router"

import { dashboardPage, settingsPage } from "@entities/__routes__"
import { i18n } from "@core/i18n"

export const AppSidebarView = createView(() =>
  nav([
    NavLink({ to: dashboardPage, children: () => i18n.t("nav.dashboard") }),
    NavLink({ to: settingsPage, children: () => i18n.t("nav.settings") }),
  ]),
  "AppSidebarView",
)`,
    'i18n from @core/i18n — wired at bootstrap via i18nProvider'
  ),
  'feat-search-model': panel(
    'feat-search-model',
    'src/features/search/model/search.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"
import { signal, computed } from "@echojs-ecosystem/framework/reactivity"
import { parseAsString, useQueryState } from "@echojs-ecosystem/url-state"

export const createSearchModel = createModel(() => {
  const $q = useQueryState("q", parseAsString.withDefault(""))
  const $draft = signal($q.value())
  const hasQuery = computed(() => $draft.value().trim().length > 0)

  return {
    draft: () => $draft.value(),
    setDraft: (v: string) => $draft.set(v),
    commit: () => $q.set($draft.value()),
    hasQuery,
  }
}, "SearchModel")`,
    'reactivity + url-state — draft locally, commit to URL on submit'
  ),
  'feat-search-index': panel(
    'feat-search-index',
    'src/features/search/index.ts',
    `export { Search } from "./component/search.component"
export { createSearchModel } from "./model/search.model"
export { SearchView } from "./view/search.view"`,
    'Feature barrel — import Search from the slice root'
  ),
  'feat-search-component': panel(
    'feat-search-component',
    'src/features/search/component/search.component.ts',
    `import { createComponent } from "@echojs-ecosystem/framework/hyperdom"

import { createSearchModel } from "../model/search.model"
import { SearchView } from "../view/search.view"

export const Search = createComponent(createSearchModel, SearchView, {
  name: "Search",
})`,
    'Feature component — wires model + view once'
  ),
  'feat-search-view': panel(
    'feat-search-view',
    'src/features/search/view/search.view.ts',
    `import { createView, form, input, button } from "@echojs-ecosystem/framework/hyperdom"

export const SearchView = createView((vm) =>
  form({
    onSubmit: (e) => { e.preventDefault(); vm.commit() },
  }, [
    input({
      value: vm.draft,
      onInput: (e) => vm.setDraft(e.target.value),
      placeholder: "Search…",
    }),
    button({ type: "submit" }, "Go"),
  ]),
  "SearchView",
)`,
    'Feature UI — portable across home, docs, workspace'
  ),
  'feat-login-form': panel(
    'feat-login-form',
    'src/features/login-form/model/login-form.form.ts',
    `import { createField, createForm } from "@echojs-ecosystem/form"
import { withLocalStorage } from "@echojs-ecosystem/persist"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginFormValue = z.infer<typeof loginSchema>

type LoginFormFields = {
  email: ReturnType<typeof createField<string>>
  password: ReturnType<typeof createField<string>>
}

export const loginForm = createForm<LoginFormValue, LoginFormFields>(
  {
    email: createField("").extend(
      withLocalStorage({ key: "echojs:login:email" })
    ),
    password: createField(""),
  },
  {
    name: "LoginForm",
    validationSchema: loginSchema,
    defaultValues: { email: "", password: "" },
  },
)`,
    'createField + createForm — persist on fields via .extend()'
  ),
  'feat-login-model': panel(
    'feat-login-model',
    'src/features/login-form/model/login-form.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"

import { signInMutation } from "@entities/session"

import { loginForm } from "./login-form.form"

export const createLoginFormModel = createModel(() => ({
  fields: loginForm.fields,
  submit: async () => {
    const result = await loginForm.submit(async (value) => {
      await signInMutation.create().mutate(value)
    })
    return result.ok
  },
  reset: () => loginForm.reset(),
}), "LoginFormModel")`,
    'model wires submit — form tree lives in *.form.ts'
  ),
  'feat-login-index': panel(
    'feat-login-index',
    'src/features/login-form/index.ts',
    `export { LoginForm } from "./component/login-form.component"
export { loginForm } from "./model/login-form.form"
export { createLoginFormModel } from "./model/login-form.model"
export { LoginFormView } from "./view/login-form.view"`,
    'Login feature — form in model/, component in component/'
  ),
  'feat-login-component': panel(
    'feat-login-component',
    'src/features/login-form/component/login-form.component.ts',
    `import { createComponent } from "@echojs-ecosystem/framework/hyperdom"

import { createLoginFormModel } from "../model/login-form.model"
import { LoginFormView } from "../view/login-form.view"

export const LoginForm = createComponent(
  createLoginFormModel,
  LoginFormView,
  { name: "LoginForm" },
)`,
    'LoginForm component — drop into any page view'
  ),
  'feat-login-view': panel(
    'feat-login-view',
    'src/features/login-form/view/login-form.view.ts',
    `import { createView, form, input, button } from "@echojs-ecosystem/framework/hyperdom"
import { bindField } from "@echojs-ecosystem/form/hyperdom"

import type { LoginFormVM } from "../model/login-form.model"

export const LoginFormView = createView((vm: LoginFormVM) => {
  const { email, password } = vm.fields

  return form({ onSubmit: (e) => { e.preventDefault(); void vm.submit() } }, [
    input({ type: "email", ...bindField(email) }),
    input({
      ...bindField(password),
      type: "password",
    }),
    button({ type: "submit" }, "Sign in"),
  ])
}, "LoginFormView")`,
    'bindField on fields from *.form.ts — no manual onInput'
  ),
  'feat-theme-model': panel(
    'feat-theme-model',
    'src/features/theme-toggle/model/theme-toggle.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"
import { createStore } from "@echojs-ecosystem/store"
import { persist } from "@echojs-ecosystem/persist"

export const themeStore = createStore({
  theme: persist("theme", "light" as "light" | "dark"),
})

export const createThemeToggleModel = createModel(() => ({
  theme: () => themeStore.theme(),
  toggle: () =>
    themeStore.theme.set(themeStore.theme() === "light" ? "dark" : "light"),
}), "ThemeToggleModel")`,
    'store + persist — client preferences survive reloads'
  ),
  'feat-theme-index': panel(
    'feat-theme-index',
    'src/features/theme-toggle/index.ts',
    `export { ThemeToggle } from "./component/theme-toggle.component"
export { createThemeToggleModel } from "./model/theme-toggle.model"
export { ThemeToggleView } from "./view/theme-toggle.view"`,
    'Theme toggle — small feature, same slice layout'
  ),
  'feat-theme-component': panel(
    'feat-theme-component',
    'src/features/theme-toggle/component/theme-toggle.component.ts',
    `import { createComponent } from "@echojs-ecosystem/framework/hyperdom"

import { createThemeToggleModel } from "../model/theme-toggle.model"
import { ThemeToggleView } from "../view/theme-toggle.view"

export const ThemeToggle = createComponent(
  createThemeToggleModel,
  ThemeToggleView,
  { name: "ThemeToggle" },
)`,
    'ThemeToggle component — used in app-shell header'
  ),
  'feat-theme-view': panel(
    'feat-theme-view',
    'src/features/theme-toggle/view/theme-toggle.view.ts',
    `import { createView, button } from "@echojs-ecosystem/framework/hyperdom"
import { Button } from "@echojs-ecosystem/framework/ui"

export const ThemeToggleView = createView((vm) =>
  Button({
    variant: "ghost",
    size: "sm",
    onClick: vm.toggle,
    children: () => (vm.theme() === "dark" ? "🌙" : "☀️"),
  }),
  "ThemeToggleView",
)`,
    'ui Button primitive on HyperDOM — variants without wrapper tax'
  ),
  'entity-session': panel(
    'entity-session',
    'src/entities/session/model/session.store.ts',
    `import { createStore } from "@echojs-ecosystem/store"
import { persist } from "@echojs-ecosystem/persist"

export const sessionStore = createStore({
  token: persist<string | null>("session.token", null),
  displayName: persist("session.name", "Guest"),
  role: persist<"admin" | "user">("session.role", "user"),
})`,
    'Entity store — shared session readable from any model'
  ),
  'entity-users-api': panel(
    'entity-users-api',
    'src/entities/user/api/users.api.ts',
    `import { createHttp } from "@echojs-ecosystem/network-http"

const http = createHttp({ baseUrl: "/api" })

export const usersApi = {
  stats: (signal?: AbortSignal) =>
    http.get<{ users: number; orders: number }>("/stats", { signal }),
  list: (signal?: AbortSignal) =>
    http.get<User[]>("/users", { signal }),
}`,
    'network/http — typed client with abort-aware requests'
  ),
  'entity-users-query': panel(
    'entity-users-query',
    'src/entities/user/api/users.query.ts',
    `import { createQuery, createMutation } from "@echojs-ecosystem/framework/async"
import { usersApi } from "./users.api"

export const dashboardStatsQuery = createQuery({
  name: "dashboard-stats",
  queryKey: () => ["stats"] as const,
  queryFn: ({ signal }) => usersApi.stats(signal),
})

export const usersQuery = createQuery({
  name: "users",
  queryKey: () => ["users"] as const,
  queryFn: ({ signal }) => usersApi.list(signal),
})`,
    'async — query definitions with stable keys and abort signals'
  ),
  'entity-users-infinite': panel(
    'entity-users-infinite',
    'src/entities/product/api/products.infinite.ts',
    `import { createInfiniteQuery } from "@echojs-ecosystem/framework/async"
import { http } from "@core/api/http"

export const productsInfiniteQuery = createInfiniteQuery({
  name: "products",
  queryKey: () => ["products"] as const,
  queryFn: ({ pageParam = 1, signal }) =>
    http.get(\`/products?page=\${pageParam}\`, { signal }),
  getNextPageParam: (last) => last.nextPage,
})`,
    'Infinite lists — pageParam + getNextPageParam in one definition'
  ),
  'entity-user-model': panel(
    'entity-user-model',
    'src/entities/user/model/user.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"
import { usersQuery } from "../api/users.query"

export const createUserListModel = createModel(() => {
  const users = usersQuery.with()
  return {
    users,
    names: () => users.data()?.map((u) => u.name) ?? [],
    refetch: () => users.refetch(),
  }
}, "UserListModel")`,
    'Entity model wraps queries — pages import the entity, not raw fetch'
  ),
  'counter-index': panel(
    'counter-index',
    'src/entities/counter/index.ts',
    `export { Counter } from "./component/counter.component"
export { createCounterModel } from "./model/counter.model"
export { CounterView } from "./view/counter.view"`,
    'Entity barrel — re-exports only, wiring in component/'
  ),
  'counter-component': panel(
    'counter-component',
    'src/entities/counter/component/counter.component.ts',
    `import { createComponent } from "@echojs-ecosystem/framework/hyperdom"

import { createCounterModel } from "../model/counter.model"
import { CounterView } from "../view/counter.view"

export const Counter = createComponent(createCounterModel, CounterView, {
  name: "Counter",
})`,
    'Entity component — Counter() mounts model + view together'
  ),
  'counter-model': panel(
    'counter-model',
    'src/entities/counter/model/counter.model.ts',
    `import { signal } from "@echojs-ecosystem/framework/reactivity"
import { createModel } from "@echojs-ecosystem/framework/hyperdom"

export const createCounterModel = createModel(() => {
  const $count = signal(0)
  return {
    count: () => $count.value(),
    increment: () => $count.update((n) => n + 1),
    reset: () => $count.set(0),
  }
}, "CounterModel")`,
    'reactivity signals — surgical updates, easy to unit-test'
  ),
  'counter-view': panel(
    'counter-view',
    'src/entities/counter/view/counter.view.ts',
    `import { button, createView } from "@echojs-ecosystem/framework/hyperdom"

export const CounterView = createView((vm) =>
  button({ onClick: vm.increment }, () => String(vm.count())),
  "CounterView",
)`,
    'hyperdom view — thin mapping from VM to DOM'
  ),
  'counter-test': panel(
    'counter-test',
    'src/entities/counter/model/counter.model.test.ts',
    `import { describe, expect, it } from "vitest"
import { createCounterModel } from "./counter.model"

describe("CounterModel", () => {
  it("increments", () => {
    const vm = createCounterModel()
    vm.increment()
    expect(vm.count()).toBe(1)
  })
})`,
    'Vitest on models — no DOM for most unit tests',
    'Vitest'
  ),
  'core-async-index': panel(
    'core-async-index',
    'src/core/async/index.ts',
    `export { queryProvider } from "./create-query-provider"`,
    'core/async barrel — import queryProvider from @core/async'
  ),
  'core-async-provider': panel(
    'core-async-provider',
    'src/core/async/create-query-provider.ts',
    `import { createQueryProvider } from "@echojs-ecosystem/framework/async"

export const queryProvider = createQueryProvider({
  defaultOptions: { staleTime: 30_000, retry: 1 },
})`,
    'async — createQueryProvider with global cache defaults'
  ),
  'core-router-index': panel(
    'core-router-index',
    'src/core/router/index.ts',
    `export { routerProvider } from "./create-router-provider"`,
    'core/router barrel'
  ),
  'core-router-provider': panel(
    'core-router-provider',
    'src/core/router/create-router-provider.ts',
    `import { createRouterProvider } from "@echojs-ecosystem/framework/router"

import { appRouter } from "@app/router"

export const routerProvider = createRouterProvider({
  router: appRouter,
  history: "browser",
})`,
    'router — createRouterProvider wired to app routes'
  ),
  'core-ui-index': panel(
    'core-ui-index',
    'src/core/ui/index.ts',
    `export { uiProvider } from "./create-ui-provider"`,
    'core/ui barrel'
  ),
  'core-ui-provider': panel(
    'core-ui-provider',
    'src/core/ui/create-ui-provider.ts',
    `import { createUiProvider } from "@echojs-ecosystem/framework/ui"

export const uiProvider = createUiProvider({
  defaultTheme: "light",
})`,
    'ui — createUiProvider for primitives context'
  ),
  'core-i18n-index': panel(
    'core-i18n-index',
    'src/core/i18n/index.ts',
    `export { i18n, i18nProvider } from "./create-i18n-provider"`,
    'Public i18n API — views import i18n.t(), bootstrap uses i18nProvider'
  ),
  'core-i18n-provider': panel(
    'core-i18n-provider',
    'src/core/i18n/create-i18n-provider.ts',
    `import { createI18nProvider } from "@echojs-ecosystem/framework/i18n"

import en from "./en.json"

export const i18nProvider = createI18nProvider({
  fallbackLocale: "en",
  locales: { en },
})

export const i18n = i18nProvider.i18n`,
    'i18n — createI18nProvider + app instance beside en.json'
  ),
  'core-store-index': panel(
    'core-store-index',
    'src/core/store/index.ts',
    `export { storeProvider } from "./create-store-provider"`,
    'core/store barrel'
  ),
  'core-store-provider': panel(
    'core-store-provider',
    'src/core/store/create-store-provider.ts',
    `import { createStoreProvider } from "@echojs-ecosystem/framework/store"

export const storeProvider = createStoreProvider()`,
    'store — createStoreProvider for global client state'
  ),
  'core-http': panel(
    'core-http',
    'src/core/api/http.ts',
    `import { createHttp } from "@echojs-ecosystem/network-http"

export const http = createHttp({
  baseUrl: import.meta.env.VITE_API_URL ?? "/api",
  retry: { attempts: 2, delayMs: 300 },
  timeoutMs: 10_000,
})`,
    'network/http — retries, timeouts, typed responses'
  ),
  'core-i18n-json': panel(
    'core-i18n-json',
    'src/core/i18n/en.json',
    `{
  "nav": {
    "dashboard": "Dashboard",
    "settings": "Settings"
  },
  "dashboard": {
    "title": "Workspace overview"
  }
}`,
    'Locale messages — useTranslate() reads keys reactively',
    'JSON',
    'json'
  ),
  'core-cn': panel(
    'core-cn',
    'src/core/styles/cn.ts',
    `import { twMerge } from "tailwind-merge"

export const cn = (...classes: (string | false | undefined)[]) =>
  twMerge(classes.filter(Boolean).join(" "))`,
    'Shared cn helper for ui + widgets'
  ),
  'core-media': panel(
    'core-media',
    'src/core/hooks/use-breakpoint.ts',
    `import { useMediaQuery } from "@echojs-ecosystem/utils"

export const useBreakpoint = () =>
  useMediaQuery("(min-width: 1024px)")`,
    'utils — signal-native composables for browser APIs'
  ),
  'core-permission-engine': panel(
    'core-permission-engine',
    'src/core/permission/permission-engine.ts',
    `import {
  createPermission,
  createPermissionTemplate,
} from "@echojs-ecosystem/permission"

export type User = { id: string; role: string; authorId: string }

export type AppPermissionSchema = {
  user: [
    "read",
    { name: "update"; type: User },
    { name: "delete"; type: User },
  ]
  order: ["read", "update", "delete"]
}

const adminTemplate = createPermissionTemplate<AppPermissionSchema>({
  user: { read: true, update: true, delete: true },
  order: { read: true, update: true, delete: true },
})

const viewerTemplate = createPermissionTemplate<AppPermissionSchema>({
  user: {
    read: true,
    update: false,
    delete: (user) => user.authorId === user.id,
  },
  order: { read: true, update: false, delete: false },
})

export const appPermission = createPermission<AppPermissionSchema>()

export const applyRolePermissions = (role: "admin" | "viewer"): void => {
  appPermission.setup(role === "admin" ? adminTemplate : viewerTemplate)
}`,
    'permission — typed RBAC/ABAC engine on signals + SSR hydrate'
  ),
  'core-permission-index': panel(
    'core-permission-index',
    'src/core/permission/index.ts',
    `export {
  appPermission,
  applyRolePermissions,
  type AppPermissionSchema,
  type User,
} from "./permission-engine"`,
    'core/permission — single import for views and route guards'
  ),
  'widget-data-table-compound': panel(
    'widget-data-table-compound',
    'src/widgets/data-table/view/data-table.compound.ts',
    `import {
  createCompoundView,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
} from "@echojs-ecosystem/framework/hyperdom"

export const DataTable = createCompoundView({
  name: "DataTable",
  parts: {
    Head: (props) => thead({ class: "data-table__head" }, props.children),
    Body: (props) => tbody({ class: "data-table__body" }, props.children),
    Row: (props) => tr({ class: "data-table__row" }, props.children),
    HeaderCell: (props) => th({ class: "data-table__th" }, props.children),
    Cell: (props) => td({ class: "data-table__td" }, props.children),
  },
  render: ({ Head, Body }) =>
    table({ class: "data-table w-full" }, [Head(), Body()]),
})`,
    'createCompoundView — namespaced slots (DataTable.Head, .Body, …)'
  ),
  'widget-data-table-index': panel(
    'widget-data-table-index',
    'src/widgets/data-table/index.ts',
    `export { DataTable } from "./view/data-table.compound"`,
    'widgets public API — compound table reused by features'
  ),
  'feat-users-list-model': panel(
    'feat-users-list-model',
    'src/features/users-list/model/users-list.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"

import { usersQuery } from "@entities/user/api/users.query"

export const createUsersListModel = createModel(() => {
  const users = usersQuery.with()

  return {
    rows: () => users.data() ?? [],
    isPending: () => users.isPending(),
    refetch: () => users.refetch(),
  }
}, "UsersListModel")`,
    'feature model — server state from entity queries'
  ),
  'feat-users-list-view': panel(
    'feat-users-list-view',
    'src/features/users-list/view/users-list.view.ts',
    `import {
  button,
  createView,
  div,
  Show,
} from "@echojs-ecosystem/framework/hyperdom"

import { appPermission } from "@core/permission"
import { DataTable } from "@widgets/data-table"

import type { UsersListVM } from "../model/users-list.model"

export const UsersListView = createView((vm: UsersListVM) =>
  div({ class: "users-page" }, [
    DataTable([
      DataTable.Head([
        DataTable.Row([
          DataTable.HeaderCell("Name"),
          DataTable.HeaderCell("Role"),
          DataTable.HeaderCell(""),
        ]),
      ]),
      DataTable.Body(() =>
        vm.rows().map((user) =>
          DataTable.Row([
            DataTable.Cell(user.name),
            DataTable.Cell(user.role),
            DataTable.Cell([
              Show(
                () => appPermission.check("user.delete", user),
                () => button({ type: "button" }, "Delete"),
              ),
            ]),
          ]),
        ),
      ),
    ]),
  ]),
  "UsersListView",
)`,
    'permission.check + compound DataTable in one feature view'
  ),
  'feat-users-list-component': panel(
    'feat-users-list-component',
    'src/features/users-list/component/users-list.component.ts',
    `import { createComponent } from "@echojs-ecosystem/framework/hyperdom"

import { createUsersListModel } from "../model/users-list.model"
import { UsersListView } from "../view/users-list.view"

export const UsersList = createComponent(
  createUsersListModel,
  UsersListView,
  { name: "UsersList" },
)`,
    'UsersList component — permission + DataTable inside the view'
  ),
  'feat-users-list-index': panel(
    'feat-users-list-index',
    'src/features/users-list/index.ts',
    `export { UsersList } from "./component/users-list.component"
export { createUsersListModel } from "./model/users-list.model"
export type { UsersListVM } from "./model/users-list.model"
export { UsersListView } from "./view/users-list.view"`,
    'Feature barrel — pages import UsersList from index.ts'
  ),
}
