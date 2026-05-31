import { List, Show, createView, type Child } from "@echojs/hyperdom";
import {
  article,
  button,
  code,
  div,
  h3,
  h4,
  input,
  li,
  p,
  section,
  span,
  strong,
  ul,
} from "@echojs/hyperdom";

import type { QueryDemoVM } from "@features/query-demo/model/query-demo.model.js";
import { QueryDemoPlaygroundView } from "@features/query-demo/ui/query-demo-playground.view.js";
import type { JpPost, JpUser } from "@shared/api/jsonplaceholder.js";

const statusClass = (kind: "idle" | "pending" | "success" | "error" | "fetching"): string =>
  `demo-query__status demo-query__status--${kind}`;

const StatusBadge = (label: string, status: () => string, fetching: () => boolean): Child =>
  span(
    { class: () => (fetching() ? statusClass("fetching") : statusClass(status() as "idle")) },
    () => (fetching() ? `${label}: fetching` : `${label}: ${status()}`),
  );

export const QueryDemoView = createView((vm: QueryDemoVM): Child => {
  const { users, user, posts, postsInfinite, $selectedUserId, $draftTitle } = vm;

  const userRow = (u: JpUser): Child =>
    button(
      {
        type: "button",
        class: () =>
          $selectedUserId.value() === u.id
            ? "demo-query__user demo-query__user--active"
            : "demo-query__user",
        "on:click": () => vm.selectUser(u.id),
      },
      [strong(null, u.name), span(null, `@${u.username}`)],
    );

  return article({ class: "demo-query" }, [
    p({ class: "demo-query__api" }, [
      "Публичное API: ",
      code(null, "https://jsonplaceholder.typicode.com"),
      " — фейковый REST backend (данные не сохраняются на сервере).",
    ]),

    div({ class: "demo-query__toolbar" }, [
      StatusBadge("users", () => users.status(), () => users.isFetching()),
      StatusBadge("user", () => user.status(), () => user.isFetching()),
      StatusBadge("posts", () => posts.status(), () => posts.isFetching()),
      StatusBadge(
        "infinite",
        () => (postsInfinite.pending() ? "pending" : postsInfinite.error() ? "error" : postsInfinite.pages().length ? "success" : "idle"),
        () => postsInfinite.fetching(),
      ),
      span({ class: "demo-query__pending" }, () => `pending: ${user.$pendingCount.value()}`),
      button({ type: "button", "on:click": () => void vm.refetchAll() }, "Refetch all"),
      button({ type: "button", class: "secondary", "on:click": vm.invalidatePosts }, "Invalidate posts"),
      button({ type: "button", class: "secondary", "on:click": vm.cancelActive }, "Cancel"),
    ]),

    div({ class: "demo-query__layout" }, [
      section({ class: "demo-query__panel" }, [
        h4(null, "Users"),
        Show(
          () => users.isPending() && !users.hasData(),
          () => p({ class: "demo-query__hint" }, "Загрузка списка…"),
        ),
        Show(
          () => users.isError(),
          () => p({ class: "demo-query__error" }, () => String(users.error())),
        ),
        ul(
          { class: "demo-query__users" },
          List(() => users.data() ?? [], userRow),
        ),
      ]),

      section({ class: "demo-query__panel demo-query__panel--main" }, [
        h4(null, "Profile"),
        Show(
          () => user.isFetching() && user.hasData(),
          () => p({ class: "demo-query__hint" }, "Обновление профиля (keepPreviousData)…"),
        ),
        Show(
          () => user.isPending() && !user.hasData(),
          () => p({ class: "demo-query__hint" }, "Загрузка профиля…"),
        ),
        Show(
          () => user.isError(),
          () => p({ class: "demo-query__error" }, () => String(user.error())),
        ),
        Show(
          () => user.hasData(),
          () => {
            const profile = user.data() as JpUser | undefined;
            if (!profile) return null;
            return div({ class: "demo-query__profile" }, [
              h3(null, profile.name),
              p(null, [code(null, profile.email), " · ", profile.phone]),
              p(null, [strong(null, profile.company.name), " — ", profile.company.catchPhrase]),
              p(null, [
                profile.address.city,
                ", ",
                profile.address.street,
              ]),
            ]);
          },
        ),

        h4({ style: { "margin-top": "20px" } }, "Posts"),
        Show(
          () => posts.isPending() && !posts.hasData(),
          () => p({ class: "demo-query__hint" }, "Загрузка постов…"),
        ),
        ul(
          { class: "demo-query__posts" },
          List(
            () => posts.data() ?? [],
            (post: JpPost) =>
              li({ class: "demo-query__post" }, [
                strong(null, post.title),
                p(null, post.body),
              ]),
          ),
        ),
      ]),
    ]),

    section({ class: "demo-query__infinite" }, [
      h4(null, "Infinite query (createInfiniteQuery)"),
      p({ class: "demo-query__hint" }, [
        "Посты подгружаются страницами по 3 шт. через ",
        code(null, "fetchNextPage()"),
        ". JSONPlaceholder: ",
        code(null, "_start"),
        " / ",
        code(null, "_limit"),
        ".",
      ]),
      Show(
        () => postsInfinite.pending() && postsInfinite.pages().length === 0,
        () => p({ class: "demo-query__hint" }, "Загрузка первой страницы…"),
      ),
      Show(
        () => postsInfinite.error() !== null,
        () => p({ class: "demo-query__error" }, () => String(postsInfinite.error())),
      ),
      ul(
        { class: "demo-query__posts demo-query__posts--infinite" },
        List(
          () => postsInfinite.flatMap((page) => page.posts),
          (post: JpPost) =>
            li({ class: "demo-query__post" }, [
              strong(null, post.title),
              p(null, post.body),
            ]),
        ),
      ),
      div({ class: "demo-query__infinite-meta" }, [
        span(null, () => `pages: ${postsInfinite.pages().length}`),
        span(null, () => `items: ${postsInfinite.flatMap((p) => p.posts).length}`),
        span(null, () =>
          postsInfinite.fetchingNextPage() ? "loading next…" : postsInfinite.hasNextPage() ? "has next" : "end",
        ),
      ]),
      div({ class: "demo-query__infinite-actions" }, [
        button(
          {
            type: "button",
            disabled: () =>
              !postsInfinite.hasNextPage() || postsInfinite.fetchingNextPage(),
            "on:click": () => void vm.loadMorePosts(),
          },
          () => (postsInfinite.fetchingNextPage() ? "Loading…" : "Load more"),
        ),
        button(
          { type: "button", class: "secondary", "on:click": vm.resetPostsInfinite },
          "Reset",
        ),
        button(
          {
            type: "button",
            class: "secondary",
            "on:click": () => void postsInfinite.refetch(),
          },
          "Refetch",
        ),
      ]),
    ]),

    section({ class: "demo-query__mutation" }, [
      h4(null, "Mutation (POST /posts)"),
      p({ class: "demo-query__hint" }, [
        "После ",
        code(null, "createMutation.run()"),
        " кэш постов инвалидируется и refetch'ится.",
      ]),
      div({ class: "demo-query__mutation-form" }, [
        input({
          type: "text",
          value: $draftTitle.value(),
          placeholder: "Post title",
          "on:change": (e) => $draftTitle.set(e.currentTarget.value),
        }),
        button(
          {
            type: "button",
            disabled: () => vm.createPost.isPending(),
            "on:click": () => void vm.submitPost(),
          },
          () => (vm.createPost.isPending() ? "Sending…" : "Create post"),
        ),
      ]),
      Show(
        () => vm.createPost.isSuccess(),
        () => p({ class: "demo-query__success" }, () => `Created id=${vm.createPost.data()?.id}`),
      ),
      Show(
        () => vm.createPost.isError(),
        () => p({ class: "demo-query__error" }, () => String(vm.createPost.error())),
      ),
    ]),

    QueryDemoPlaygroundView(vm),
  ]);
}, "QueryDemoView");
