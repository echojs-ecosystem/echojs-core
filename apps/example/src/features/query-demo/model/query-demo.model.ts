import { signal } from "@echojs/reactivity";
import type { Signal } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";

import { getQueryProvider } from "@echojs/query";
import {
  createPostMutation,
  getUserPostsInfiniteQuery,
  getUserPostsQuery,
  getUserQuery,
  listUsersQuery,
  slowCreatePostMutation,
  slowUserQuery,
} from "@features/query-demo/api/jsonplaceholder.queries.js";
import { i18n } from "@app/providers/i18n.js";
import { abortLabel, timestamp } from "@features/query-demo/utils/query-demo.utils.js";
import type { JpPost, JpUser } from "@shared/api/jsonplaceholder.js";

const log = ($log: Signal<string>, message: string): void => {
  $log.set(`[${timestamp()}] ${message}`);
};

export interface QueryDemoVM {
  users: ReturnType<typeof listUsersQuery.with>;
  user: ReturnType<typeof getUserQuery.with>;
  posts: ReturnType<typeof getUserPostsQuery.with>;
  postsWhenEnabled: ReturnType<typeof getUserPostsQuery.with>;
  postsInfinite: ReturnType<typeof getUserPostsInfiniteQuery.with>;
  routeBoundUser: ReturnType<typeof getUserQuery.with>;
  slowUser: ReturnType<typeof slowUserQuery.with>;
  createPost: ReturnType<typeof createPostMutation.create>;
  slowCreatePost: ReturnType<typeof slowCreatePostMutation.create>;

  $selectedUserId: Signal<number>;
  $draftTitle: Signal<string>;
  $slowUserId: Signal<number>;
  $postsEnabled: Signal<boolean>;
  $playgroundLog: Signal<string>;
  $routeSession: Signal<number>;

  selectUser: (id: number) => void;
  refetchAll: () => Promise<unknown[]>;
  invalidatePosts: () => void;
  cancelActive: () => void;
  loadMorePosts: () => Promise<unknown>;
  resetPostsInfinite: () => void;
  submitPost: () => Promise<JpPost>;

  togglePostsEnabled: () => void;
  prefetchSelectedUser: () => Promise<JpUser>;
  patchSelectedUserName: () => void;
  readCachedUserName: () => string | undefined;
  clearUserCache: () => void;

  startSlowFetch: () => void;
  abortSlowFetch: (reason?: string) => void;

  refetchWithManualController: () => void;
  abortManualController: () => void;

  simulateRouteLeave: () => void;
  simulateRouteEnter: () => void;

  loadMoreWithManualAbort: () => void;
  abortInfiniteLoad: () => void;

  submitSlowPost: () => Promise<JpPost>;
  abortSlowMutation: () => void;

  abortSignalLabel: (source: "user" | "slow" | "infinite" | "mutation") => string;
}

export const createQueryDemoModel = createModel((): QueryDemoVM => {
  const $selectedUserId = signal(1);
  const $draftTitle = signal("EchoJS query demo");
  const $slowUserId = signal(1);
  const $postsEnabled = signal(true);
  const $playgroundLog = signal(i18n.t("queryDemo.playgroundReady"));
  const $routeSession = signal(1);

  let manualRefetchAc: AbortController | null = null;
  let infinitePageAc: AbortController | null = null;
  let routeAc = new AbortController();

  const users = listUsersQuery.with();
  const user = getUserQuery.with(() => ({ id: $selectedUserId.value() }));
  const posts = getUserPostsQuery.with(() => ({ userId: $selectedUserId.value() }));
  const postsWhenEnabled = getUserPostsQuery.with(
    () => ({ userId: $selectedUserId.value() }),
    { enabled: () => $postsEnabled.value() },
  );
  const postsInfinite = getUserPostsInfiniteQuery.with(() => ({
    userId: $selectedUserId.value(),
  }));
  const routeBoundUser = getUserQuery.with(
    () => ({ id: $selectedUserId.value() }),
    { signal: () => routeAc.signal },
  );
  const slowUser = slowUserQuery.with(() => ({ id: $slowUserId.value() }), {
    enabled: false,
    refetchOnMount: false,
  });
  const createPost = createPostMutation.create();
  const slowCreatePost = slowCreatePostMutation.create();

  const client = getQueryProvider()!.client;

  return {
    users,
    user,
    posts,
    postsWhenEnabled,
    postsInfinite,
    routeBoundUser,
    slowUser,
    createPost,
    slowCreatePost,
    $selectedUserId,
    $draftTitle,
    $slowUserId,
    $postsEnabled,
    $playgroundLog,
    $routeSession,

    selectUser: (id) => $selectedUserId.set(id),
    refetchAll: () => Promise.all([users.refetch(), user.refetch(), posts.refetch()]),
    invalidatePosts: () => {
      getQueryProvider()!.invalidateQueries(["jsonplaceholder", "posts"], { refetch: "active" });
      log($playgroundLog, "invalidateQueries(['posts'])");
    },
    cancelActive: () => {
      user.cancel();
      posts.cancel();
      postsInfinite.cancel();
      log($playgroundLog, "cancel() на user / posts / infinite");
    },
    loadMorePosts: () => postsInfinite.fetchNextPage(),
    resetPostsInfinite: () => postsInfinite.reset(),
    submitPost: () =>
      createPost.run({
        userId: $selectedUserId.value(),
        title: $draftTitle.value(),
        body: "Created from @echojs/query example app.",
      }),

    togglePostsEnabled: () => {
      $postsEnabled.set(!$postsEnabled.value());
      log($playgroundLog, `posts enabled = ${$postsEnabled.value()}`);
    },
    prefetchSelectedUser: () => {
      const id = $selectedUserId.value();
      log($playgroundLog, `prefetchQuery user id=${id}`);
      return client.prefetchQuery(getUserQuery, { id }).then(() => {
        log($playgroundLog, `prefetch done id=${id}`);
        return client.getQueryData(getUserQuery, { id }) as JpUser;
      });
    },
    patchSelectedUserName: () => {
      const id = $selectedUserId.value();
      client.setQueryData(getUserQuery, { id }, (prev) => {
        const user = prev as JpUser | undefined;
        return user ? { ...user, name: `${user.name} [patched]` } : prev;
      });
      log($playgroundLog, `setQueryData patch name id=${id}`);
    },
    readCachedUserName: () => {
      const data = client.getQueryData(getUserQuery, { id: $selectedUserId.value() }) as
        | JpUser
        | undefined;
      return data?.name;
    },
    clearUserCache: () => {
      client.removeQueries(["jsonplaceholder", "user"]);
      log($playgroundLog, "removeQueries(['jsonplaceholder', 'user'])");
    },

    startSlowFetch: () => {
      log($playgroundLog, `slowUser.refetch() id=${$slowUserId.value()} (~4s)`);
      void slowUser.refetch().catch((error) => {
        log($playgroundLog, `slowUser error: ${String(error)}`);
      });
    },
    abortSlowFetch: (reason = "slow-demo") => {
      slowUser.abort(reason);
      log($playgroundLog, `slowUser.abort('${reason}')`);
    },

    refetchWithManualController: () => {
      manualRefetchAc?.abort("replaced");
      manualRefetchAc = new AbortController();
      log($playgroundLog, "user.refetch({ abortController }) — новый AC");
      void user
        .refetch({ abortController: manualRefetchAc })
        .then(() => log($playgroundLog, "manual refetch success"))
        .catch((error) => log($playgroundLog, `manual refetch: ${String(error)}`));
    },
    abortManualController: () => {
      manualRefetchAc?.abort("manual-button");
      log($playgroundLog, "manual AbortController.abort('manual-button')");
    },

    simulateRouteLeave: () => {
      routeAc.abort("route-leave");
      log($playgroundLog, "route signal aborted (route-leave)");
    },
    simulateRouteEnter: () => {
      routeAc = new AbortController();
      $routeSession.set($routeSession.value() + 1);
      log($playgroundLog, `route enter — session ${$routeSession.value()}, новый signal`);
      void routeBoundUser.refetch().catch((error) => {
        log($playgroundLog, `routeBound refetch: ${String(error)}`);
      });
    },

    loadMoreWithManualAbort: () => {
      infinitePageAc?.abort("replaced");
      infinitePageAc = new AbortController();
      log($playgroundLog, "fetchNextPage({ abortController })");
      void postsInfinite
        .fetchNextPage({ abortController: infinitePageAc })
        .catch((error) => log($playgroundLog, `infinite page: ${String(error)}`));
    },
    abortInfiniteLoad: () => {
      infinitePageAc?.abort("infinite-abort");
      log($playgroundLog, "infinite AbortController.abort()");
    },

    submitSlowPost: () => {
      log($playgroundLog, "slowCreatePost.run() (~5s delay)");
      return slowCreatePost
        .run({
          userId: $selectedUserId.value(),
          title: `[slow] ${$draftTitle.value()}`,
          body: "Slow mutation abort demo.",
        })
        .then((post) => {
          log($playgroundLog, `slow mutation success id=${post.id}`);
          return post;
        })
        .catch((error) => {
          log($playgroundLog, `slow mutation: ${String(error)}`);
          throw error;
        });
    },
    abortSlowMutation: () => {
      slowCreatePost.abort("mutation-cancel");
      log($playgroundLog, "slowCreatePost.abort('mutation-cancel')");
    },

    abortSignalLabel: (source) => {
      switch (source) {
        case "user":
          return abortLabel(user.abortSignal());
        case "slow":
          return abortLabel(slowUser.abortSignal());
        case "infinite":
          return abortLabel(postsInfinite.abortSignal());
        case "mutation":
          return abortLabel(slowCreatePost.abortSignal());
      }
    },
  };
}, "QueryDemoModel");
