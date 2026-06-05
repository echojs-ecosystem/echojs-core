import { List, Show, createView, type Child } from "@echojs-ecosystem/hyperdom";
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
} from "@echojs-ecosystem/hyperdom";

import { i18n } from "@app/providers/i18n.js";
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
        onClick: () => vm.selectUser(u.id),
      },
      [strong(null, u.name), span(null, `@${u.username}`)],
    );

  return article({ class: "demo-query" }, [
    p({ class: "demo-query__api" }, () => i18n.t("queryDemo.apiHint")),

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
      button(
        { type: "button", onClick: () => void vm.refetchAll() },
        () => i18n.t("queryDemo.refetchAll"),
      ),
      button(
        { type: "button", class: "secondary", onClick: vm.invalidatePosts },
        () => i18n.t("queryDemo.invalidatePosts"),
      ),
      button(
        { type: "button", class: "secondary", onClick: vm.cancelActive },
        () => i18n.t("queryDemo.cancel"),
      ),
    ]),

    div({ class: "demo-query__layout" }, [
      section({ class: "demo-query__panel" }, [
        h4(null, () => i18n.t("queryDemo.users")),
        Show(
          () => users.isPending() && !users.hasData(),
          () => p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.loadingUsers")),
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
        h4(null, () => i18n.t("queryDemo.profile")),
        Show(
          () => user.isFetching() && user.hasData(),
          () => p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.updatingProfile")),
        ),
        Show(
          () => user.isPending() && !user.hasData(),
          () => p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.loadingProfile")),
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

        h4({ style: { "margin-top": "20px" } }, () => i18n.t("queryDemo.posts")),
        Show(
          () => posts.isPending() && !posts.hasData(),
          () => p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.loadingPosts")),
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
      h4(null, () => i18n.t("queryDemo.infiniteTitle")),
      p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.infiniteHint")),
      Show(
        () => postsInfinite.pending() && postsInfinite.pages().length === 0,
        () => p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.loadingFirstPage")),
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
            onClick: () => void vm.loadMorePosts(),
          },
          () =>
            postsInfinite.fetchingNextPage()
              ? i18n.t("queryDemo.loading")
              : i18n.t("queryDemo.loadMore"),
        ),
        button(
          { type: "button", class: "secondary", onClick: vm.resetPostsInfinite },
          () => i18n.t("queryDemo.reset"),
        ),
        button(
          {
            type: "button",
            class: "secondary",
            onClick: () => void postsInfinite.refetch(),
          },
          () => i18n.t("queryDemo.refetch"),
        ),
      ]),
    ]),

    section({ class: "demo-query__mutation" }, [
      h4(null, () => i18n.t("queryDemo.mutationTitle")),
      p({ class: "demo-query__hint" }, () => i18n.t("queryDemo.mutationHint")),
      div({ class: "demo-query__mutation-form" }, [
        input({
          type: "text",
          value: $draftTitle.value(),
          placeholder: i18n.t("queryDemo.postTitle"),
          onChange: (e) => $draftTitle.set(e.currentTarget.value),
        }),
        button(
          {
            type: "button",
            disabled: () => vm.createPost.isPending(),
            onClick: () => void vm.submitPost(),
          },
          () =>
            vm.createPost.isPending() ? i18n.t("queryDemo.sending") : i18n.t("queryDemo.createPost"),
        ),
      ]),
      Show(
        () => vm.createPost.isSuccess(),
        () =>
          p({ class: "demo-query__success" }, () =>
            i18n.t("queryDemo.createdId", { id: vm.createPost.data()?.id ?? "?" }),
          ),
      ),
      Show(
        () => vm.createPost.isError(),
        () => p({ class: "demo-query__error" }, () => String(vm.createPost.error())),
      ),
    ]),

    QueryDemoPlaygroundView(vm),
  ]);
}, "QueryDemoView");
