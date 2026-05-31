import { Show, createView, type Child } from "@echojs/hyperdom";
import { button, code, div, h4, input, label, p, pre, section, span, strong } from "@echojs/hyperdom";

import type { QueryDemoVM } from "@features/query-demo/model/query-demo.model.js";
import type { JpUser } from "@shared/api/jsonplaceholder.js";

const PlaygroundCard = (title: string, body: Child): Child =>
  div({ class: "demo-query__card" }, [h4(null, title), body]);

export const QueryDemoPlaygroundView = createView((vm: QueryDemoVM): Child => {
  const { slowUser, routeBoundUser, postsWhenEnabled, slowCreatePost, $slowUserId, $postsEnabled, $playgroundLog, $routeSession } = vm;

  const signalRow = (labelText: string, value: () => string): Child =>
    div({ class: "demo-query__signal-row" }, [
      code(null, labelText),
      span(null, value),
    ]);

  return section({ class: "demo-query__playground" }, [
    h4(null, "Playground — тестирование API"),
    p({ class: "demo-query__hint" }, [
      "Сценарии для ",
      code(null, "createQuery"),
      ", ",
      code(null, "createInfiniteQuery"),
      ", ",
      code(null, "createMutation"),
      " и ",
      code(null, "AbortController"),
      ".",
    ]),

    div({ class: "demo-query__playground-grid" }, [
      PlaygroundCard("Slow query (~4s)", [
        p({ class: "demo-query__hint" }, "Задержка перед fetch — успей нажать Abort."),
        div({ class: "demo-query__card-row" }, [
          label(null, [
            "user id ",
            input({
              type: "number",
              min: "1",
              max: "10",
              value: String($slowUserId.value()),
              "on:change": (e) => $slowUserId.set(Number(e.currentTarget.value) || 1),
            }),
          ]),
        ]),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", "on:click": vm.startSlowFetch }, "refetch()"),
          button({ type: "button", class: "secondary", "on:click": () => vm.abortSlowFetch() }, "abort()"),
          button({ type: "button", class: "secondary", "on:click": () => vm.slowUser.cancel() }, "cancel()"),
        ]),
        signalRow("status", () => slowUser.status()),
        signalRow("abortSignal", () => vm.abortSignalLabel("slow")),
        Show(
          () => slowUser.hasData(),
          () => p(null, () => strong(null, slowUser.data()?.name ?? "")),
        ),
      ]),

      PlaygroundCard("Manual AbortController", [
        p({ class: "demo-query__hint" }, [
          code(null, "user.refetch({ abortController })"),
          " — свой контроллер на один refetch.",
        ]),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", "on:click": vm.refetchWithManualController }, "Start refetch"),
          button({ type: "button", class: "secondary", "on:click": vm.abortManualController }, "AC.abort()"),
        ]),
        signalRow("user.abortSignal", () => vm.abortSignalLabel("user")),
        signalRow("fetching", () => String(vm.user.isFetching())),
      ]),

      PlaygroundCard("External signal (route)", [
        p({ class: "demo-query__hint" }, [
          "Instance с ",
          code(null, "{ signal: routeAc.signal }"),
          " — как abort при уходе со страницы.",
        ]),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", class: "secondary", "on:click": vm.simulateRouteLeave }, "Route leave"),
          button({ type: "button", "on:click": vm.simulateRouteEnter }, "Route enter"),
        ]),
        signalRow("session", () => String($routeSession.value())),
        signalRow("routeBound", () => routeBoundUser.status()),
        signalRow("name", () => (routeBoundUser.data() as JpUser | undefined)?.name ?? "—"),
      ]),

      PlaygroundCard("enabled + cache", [
        p({ class: "demo-query__hint" }, "enabled: false останавливает fetch. Client cache API."),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", "on:click": vm.togglePostsEnabled }, () =>
            $postsEnabled.value() ? "Disable posts" : "Enable posts",
          ),
          button({ type: "button", class: "secondary", "on:click": () => void vm.prefetchSelectedUser() }, "prefetch user"),
          button({ type: "button", class: "secondary", "on:click": vm.patchSelectedUserName }, "setQueryData patch"),
          button({ type: "button", class: "secondary", "on:click": vm.clearUserCache }, "removeQueries"),
        ]),
        signalRow("posts enabled", () => String($postsEnabled.value())),
        signalRow("postsWhenEnabled", () => postsWhenEnabled.status()),
        signalRow("cached name", () => vm.readCachedUserName() ?? "—"),
      ]),

      PlaygroundCard("Infinite + abort", [
        p({ class: "demo-query__hint" }, [
          code(null, "fetchNextPage({ abortController })"),
          " — отмена подгрузки страницы.",
        ]),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", "on:click": vm.loadMoreWithManualAbort }, "Load page (manual AC)"),
          button({ type: "button", class: "secondary", "on:click": vm.abortInfiniteLoad }, "Abort page load"),
        ]),
        signalRow("pages", () => String(vm.postsInfinite.pages().length)),
        signalRow("abortSignal", () => vm.abortSignalLabel("infinite")),
        signalRow("fetchingNext", () => String(vm.postsInfinite.fetchingNextPage())),
      ]),

      PlaygroundCard("Slow mutation (~5s)", [
        p({ class: "demo-query__hint" }, "Долгий POST — cancel / abort во время pending."),
        div({ class: "demo-query__card-actions" }, [
          button(
            {
              type: "button",
              disabled: () => slowCreatePost.isPending(),
              "on:click": () => void vm.submitSlowPost(),
            },
            () => (slowCreatePost.isPending() ? "Pending…" : "run() slow"),
          ),
          button({ type: "button", class: "secondary", "on:click": vm.abortSlowMutation }, "abort()"),
          button({ type: "button", class: "secondary", "on:click": () => slowCreatePost.cancel() }, "cancel()"),
        ]),
        signalRow("status", () => slowCreatePost.status()),
        signalRow("abortSignal", () => vm.abortSignalLabel("mutation")),
      ]),
    ]),

    div({ class: "demo-query__log" }, [
      strong(null, "Log"),
      pre(null, () => $playgroundLog.value()),
    ]),
  ]);
}, "QueryDemoPlaygroundView");
