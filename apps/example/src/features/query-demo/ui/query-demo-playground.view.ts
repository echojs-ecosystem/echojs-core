import { Show, createView, type Child } from "@echojs/hyperdom";
import { button, code, div, h4, input, label, p, pre, section, span, strong } from "@echojs/hyperdom";

import { i18n } from "@app/i18n/index.js";
import { cardHintKey, cardTitleKey, type QueryPlaygroundCardBase } from "@app/i18n/keys.js";
import type { QueryDemoVM } from "@features/query-demo/model/query-demo.model.js";
import type { JpUser } from "@shared/api/jsonplaceholder.js";

const PlaygroundCard = (baseKey: QueryPlaygroundCardBase, body: Child): Child =>
  div({ class: "demo-query__card" }, [
    h4(null, () => i18n.t(cardTitleKey(baseKey))),
    body,
  ]);

export const QueryDemoPlaygroundView = createView((vm: QueryDemoVM): Child => {
  const { slowUser, routeBoundUser, postsWhenEnabled, slowCreatePost, $slowUserId, $postsEnabled, $playgroundLog, $routeSession } = vm;

  const signalRow = (labelText: string, value: () => string): Child =>
    div({ class: "demo-query__signal-row" }, [
      code(null, labelText),
      span(null, value),
    ]);

  return section({ class: "demo-query__playground" }, [
    h4(null, () => i18n.t("queryDemo.playgroundTitle")),
    p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.playgroundHint")),

    div({ class: "demo-query__playground-grid" }, [
      PlaygroundCard("queryDemo.cards.slow", [
        p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.cards.slow.hint")),
        div({ class: "demo-query__card-row" }, [
          label(null, [
            "user id ",
            input({
              type: "number",
              min: "1",
              max: "10",
              value: String($slowUserId.value()),
              onChange: (e) => $slowUserId.set(Number(e.currentTarget.value) || 1),
            }),
          ]),
        ]),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", onClick: vm.startSlowFetch }, "refetch()"),
          button({ type: "button", class: "secondary", onClick: () => vm.abortSlowFetch() }, "abort()"),
          button({ type: "button", class: "secondary", onClick: () => vm.slowUser.cancel() }, "cancel()"),
        ]),
        signalRow("status", () => slowUser.status()),
        signalRow("abortSignal", () => vm.abortSignalLabel("slow")),
        Show(
          () => slowUser.hasData(),
          () => p(null, () => strong(null, slowUser.data()?.name ?? "")),
        ),
      ]),

      PlaygroundCard("queryDemo.cards.manual", [
        p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.cards.manual.hint")),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", onClick: vm.refetchWithManualController }, "Start refetch"),
          button({ type: "button", class: "secondary", onClick: vm.abortManualController }, "AC.abort()"),
        ]),
        signalRow("user.abortSignal", () => vm.abortSignalLabel("user")),
        signalRow("fetching", () => String(vm.user.isFetching())),
      ]),

      PlaygroundCard("queryDemo.cards.route", [
        p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.cards.route.hint")),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", class: "secondary", onClick: vm.simulateRouteLeave }, "Route leave"),
          button({ type: "button", onClick: vm.simulateRouteEnter }, "Route enter"),
        ]),
        signalRow("session", () => String($routeSession.value())),
        signalRow("routeBound", () => routeBoundUser.status()),
        signalRow("name", () => (routeBoundUser.data() as JpUser | undefined)?.name ?? "—"),
      ]),

      PlaygroundCard("queryDemo.cards.cache", [
        p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.cards.cache.hint")),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", onClick: vm.togglePostsEnabled }, () =>
            $postsEnabled.value() ? "Disable posts" : "Enable posts",
          ),
          button({ type: "button", class: "secondary", onClick: () => void vm.prefetchSelectedUser() }, "prefetch user"),
          button({ type: "button", class: "secondary", onClick: vm.patchSelectedUserName }, "setQueryData patch"),
          button({ type: "button", class: "secondary", onClick: vm.clearUserCache }, "removeQueries"),
        ]),
        signalRow("posts enabled", () => String($postsEnabled.value())),
        signalRow("postsWhenEnabled", () => postsWhenEnabled.status()),
        signalRow("cached name", () => vm.readCachedUserName() ?? "—"),
      ]),

      PlaygroundCard("queryDemo.cards.infinite", [
        p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.cards.infinite.hint")),
        div({ class: "demo-query__card-actions" }, [
          button({ type: "button", onClick: vm.loadMoreWithManualAbort }, "Load page (manual AC)"),
          button({ type: "button", class: "secondary", onClick: vm.abortInfiniteLoad }, "Abort page load"),
        ]),
        signalRow("pages", () => String(vm.postsInfinite.pages().length)),
        signalRow("abortSignal", () => vm.abortSignalLabel("infinite")),
        signalRow("fetchingNext", () => String(vm.postsInfinite.fetchingNextPage())),
      ]),

      PlaygroundCard("queryDemo.cards.mutation", [
        p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.cards.mutation.hint")),
        div({ class: "demo-query__card-actions" }, [
          button(
            {
              type: "button",
              disabled: () => slowCreatePost.isPending(),
              onClick: () => void vm.submitSlowPost(),
            },
            () => (slowCreatePost.isPending() ? "Pending…" : "run() slow"),
          ),
          button({ type: "button", class: "secondary", onClick: vm.abortSlowMutation }, "abort()"),
          button({ type: "button", class: "secondary", onClick: () => slowCreatePost.cancel() }, "cancel()"),
        ]),
        signalRow("status", () => slowCreatePost.status()),
        signalRow("abortSignal", () => vm.abortSignalLabel("mutation")),
      ]),
    ]),

    div({ class: "demo-query__log" }, [
      strong(null, () => i18n.t("queryDemo.log")),
      pre(null, () => $playgroundLog.value()),
    ]),
  ]);
}, "QueryDemoPlaygroundView");
