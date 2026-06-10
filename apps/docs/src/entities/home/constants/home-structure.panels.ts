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
    `import { defineConfig, dependenciesDirection } from "@echojs-ecosystem/architect"

export default defineConfig({
  rules: [
    dependenciesDirection(
      ["app", "pages", "widgets", "features", "entities", "core"],
      { allowDownward: ["**/app/router/**"] },
    ),
  ],
})`,
    'Architect enforces layer order in CI'
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
import {
  queryProvider,
  routerProvider,
  uiProvider,
  i18nProvider,
  storeProvider,
} from "@core/providers"

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
    `export {
  queryProvider,
  routerProvider,
  uiProvider,
  i18nProvider,
  storeProvider,
} from "@core/providers"`,
    'App re-exports core providers — pages never import app/'
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
  {
    path: "/workspace",
    route: workspaceSection,
    children: [
      { path: "/", routeView: dashboardPage },
      { path: "settings", routeView: settingsPage },
    ],
  },
])`,
    'router — nested sections, layouts, and typed child routes'
  ),
  'routes-entity': panel(
    'routes-entity',
    'src/entities/__routes__/workspace.routes.ts',
    `import { createRoute } from "@echojs-ecosystem/framework/router"
import { workspaceLayoutPage } from "@pages/workspace/workspace.layout"

export const workspaceSection = createRoute("workspace-section")

export const workspaceLayout = createRouteView({
  name: "workspace-layout",
  route: workspaceSection,
  view: () => workspaceLayoutPage,
})`,
    'Route slices live in entities/__routes__ — reusable across apps'
  ),
  'pages-home-page': panel(
    'pages-home-page',
    'src/pages/home/home.page.ts',
    `import { createRouteView } from "@echojs-ecosystem/framework/router"
import { createComponent } from "@echojs-ecosystem/framework/hyperdom"
import { createHomeModel } from "./model/home.model"
import { HomeView } from "./ui/home.view"

const Home = createComponent(createHomeModel, HomeView)

export const homePage = createRouteView({
  name: "home",
  view: () => Home(),
})`,
    'Page glue — createRouteView + createComponent(model, view)'
  ),
  'pages-home-model': panel(
    'pages-home-model',
    'src/pages/home/model/home.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"
import { createSearchModel } from "@features/search"

export const createHomeModel = createModel(() => {
  const search = createSearchModel()
  return {
    searchVm: () => search,
    heroTitle: () => "Build with EchoJS",
  }
}, "HomeModel")`,
    'Page model composes features — no markup here'
  ),
  'pages-home-view': panel(
    'pages-home-view',
    'src/pages/home/ui/home.view.ts',
    `import { createView, main, section } from "@echojs-ecosystem/framework/hyperdom"
import { SearchView } from "@features/search"

export const HomeView = createView((vm) =>
  main(null, [
    section(null, vm.heroTitle()),
    SearchView(vm.searchVm()),
  ]),
  "HomeView",
)`,
    'hyperdom — createView maps VM → DOM, features stay imported slices'
  ),
  'ws-layout': panel(
    'ws-layout',
    'src/pages/workspace/workspace.layout.ts',
    `import { createLayoutView, div, outlet } from "@echojs-ecosystem/framework/hyperdom"
import { AppShellLayout } from "@widgets/app-shell"

export const workspaceLayoutPage = createLayoutView(() =>
  AppShellLayout({
    sidebar: true,
    children: outlet(),
  }),
  "WorkspaceLayout",
)`,
    'Nested layout — outlet() renders active child route'
  ),
  'ws-dashboard-page': panel(
    'ws-dashboard-page',
    'src/pages/workspace/dashboard/dashboard.page.ts',
    `import { createRouteView } from "@echojs-ecosystem/framework/router"
import { Dashboard } from "./dashboard.component"

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
    'src/pages/workspace/dashboard/ui/dashboard.view.ts',
    `import { createView, div, h1, Show } from "@echojs-ecosystem/framework/hyperdom"
import { Skeleton } from "@echojs-ecosystem/framework/ui"

export const DashboardView = createView((vm) =>
  div(null, [
    h1(null, () => \`Hello, \${vm.userName()}\`),
    Show(
      vm.isLoading,
      () => Skeleton({ class: "h-8 w-32" }),
      () => div(null, () => \`\${vm.totalUsers()} users\`),
    ),
  ]),
  "DashboardView",
)`,
    'ui + Show — loading states without hook rules'
  ),
  'ws-settings-page': panel(
    'ws-settings-page',
    'src/pages/workspace/settings/settings.page.ts',
    `import { createRouteView } from "@echojs-ecosystem/framework/router"
import { Settings } from "./settings.component"

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
    'src/pages/workspace/settings/ui/settings.view.ts',
    `import { createView, div, button } from "@echojs-ecosystem/framework/hyperdom"
import { LoginFormView } from "@features/login-form"

export const SettingsView = createView((vm) =>
  div(null, [
    ["profile", "security"].map((tab) =>
      button({
        class: () => (vm.activeTab() === tab ? "active" : ""),
        onClick: () => vm.setTab(tab),
      }, tab),
    ),
    LoginFormView(),
  ]),
  "SettingsView",
)`,
    'Settings tabs driven by URL search params'
  ),
  'shell-layout': panel(
    'shell-layout',
    'src/widgets/app-shell/app-shell.layout.ts',
    `import { createView, div } from "@echojs-ecosystem/framework/hyperdom"
import { AppHeaderView } from "./ui/app-header.view"
import { AppSidebarView } from "./ui/app-sidebar.view"

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
    'src/widgets/app-shell/ui/app-header.view.ts',
    `import { createView, header } from "@echojs-ecosystem/framework/hyperdom"
import { NavLink } from "@echojs-ecosystem/framework/router"
import { ThemeToggleView } from "@features/theme-toggle"
import { homePage, dashboardPage } from "@entities/__routes__"

export const AppHeaderView = createView(() =>
  header(null, [
    NavLink({ to: homePage, children: "Home" }),
    NavLink({ to: dashboardPage, children: "Workspace" }),
    ThemeToggleView(),
  ]),
  "AppHeaderView",
)`,
    'router NavLink + feature widgets in shared chrome'
  ),
  'shell-sidebar': panel(
    'shell-sidebar',
    'src/widgets/app-shell/ui/app-sidebar.view.ts',
    `import { createView, nav } from "@echojs-ecosystem/framework/hyperdom"
import { NavLink } from "@echojs-ecosystem/framework/router"
import { dashboardPage, settingsPage } from "@entities/__routes__"
import { useTranslate } from "@echojs-ecosystem/i18n"

export const AppSidebarView = createView(() => {
  const t = useTranslate()
  return nav(null, [
    NavLink({ to: dashboardPage, children: t("nav.dashboard") }),
    NavLink({ to: settingsPage, children: t("nav.settings") }),
  ])
}, "AppSidebarView")`,
    'i18n in widgets — locale-aware navigation labels'
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
  'feat-search-view': panel(
    'feat-search-view',
    'src/features/search/ui/search.view.ts',
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
  'feat-login-model': panel(
    'feat-login-model',
    'src/features/login-form/model/login-form.model.ts',
    `import { createModel } from "@echojs-ecosystem/framework/hyperdom"
import { createForm, field } from "@echojs-ecosystem/form"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const createLoginFormModel = createModel(() => {
  const form = createForm({ schema, defaultValues: { email: "", password: "" } })
  return {
    email: field(form, "email"),
    password: field(form, "password"),
    submit: () => form.handleSubmit((values) => signIn(values)),
    errors: () => form.errors(),
  }
}, "LoginFormModel")`,
    'form — schema-driven fields bound to signals'
  ),
  'feat-login-view': panel(
    'feat-login-view',
    'src/features/login-form/ui/login-form.view.ts',
    `import { createView, form, input, button } from "@echojs-ecosystem/framework/hyperdom"
import { bindField } from "@echojs-ecosystem/form/hyperdom"

export const LoginFormView = createView((vm) =>
  form({ onSubmit: (e) => { e.preventDefault(); vm.submit() } }, [
    input(bindField(vm.email)),
    input({ ...bindField(vm.password), type: "password" }),
    button({ type: "submit" }, "Sign in"),
  ]),
  "LoginFormView",
)`,
    'form/hyperdom bindings — no manual onInput wiring'
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
  'feat-theme-view': panel(
    'feat-theme-view',
    'src/features/theme-toggle/ui/theme-toggle.view.ts',
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
    `export { createCounterModel } from "./model/counter.model"
export { CounterView } from "./ui/counter.view"`,
    'Public entity API — pages import from the slice root'
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
    'src/entities/counter/ui/counter.view.ts',
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
  'core-providers': panel(
    'core-providers',
    'src/core/providers/index.ts',
    `export { queryProvider } from "./query"
export { routerProvider } from "./router"
export { uiProvider } from "./ui"
export { i18nProvider } from "./i18n"
export { storeProvider } from "./store"`,
    'core/providers — register each package once for the whole app'
  ),
  'core-query': panel(
    'core-query',
    'src/core/providers/query.ts',
    `import { createQueryProvider } from "@echojs-ecosystem/framework/async"

export const queryProvider = createQueryProvider({
  defaultOptions: { staleTime: 30_000, retry: 1 },
})`,
    'async provider — global cache defaults'
  ),
  'core-router': panel(
    'core-router',
    'src/core/providers/router.ts',
    `import { createRouterProvider } from "@echojs-ecosystem/framework/router"
import { appRouter } from "@app/router"

export const routerProvider = createRouterProvider({
  router: appRouter,
  history: "browser",
})`,
    'router provider — history + scroll restoration'
  ),
  'core-ui': panel(
    'core-ui',
    'src/core/providers/ui.ts',
    `import { createUiProvider } from "@echojs-ecosystem/framework/ui"

export const uiProvider = createUiProvider({
  defaultTheme: "light",
})`,
    'ui provider — design tokens and primitives context'
  ),
  'core-i18n': panel(
    'core-i18n',
    'src/core/providers/i18n.ts',
    `import { createI18nProvider } from "@echojs-ecosystem/framework/i18n"
import en from "../i18n/en.json"

export const i18nProvider = createI18nProvider({
  locale: "en",
  messages: { en },
})`,
    'i18n provider — dictionaries loaded at bootstrap'
  ),
  'core-store': panel(
    'core-store',
    'src/core/providers/store.ts',
    `import { createStoreProvider } from "@echojs-ecosystem/framework/store"

export const storeProvider = createStoreProvider()`,
    'store provider — global client state registry'
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
}
