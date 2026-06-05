import { describe, expectTypeOf, it } from "vitest";
import { createStore } from "@echojs-ecosystem/store";

import { createMemoryStorageAdapter } from "../adapters/memory";
import { withStorage } from "./with-storage";
import type { PersistController, PersistOptions } from "./types";

describe("withStorage types", () => {
  it("extension adds persist controller to store", () => {
    const store = createStore(0).extend(
      withStorage(createMemoryStorageAdapter(), {
        key: "counter",
      }),
    );

    expectTypeOf(store.persist).toEqualTypeOf<PersistController<number>>();
    expectTypeOf(store.persist.hydrate).returns.toEqualTypeOf<void | Promise<void>>();
  });

  it("select/merge narrows snapshot type", () => {
    type State = { token: string | null; user: { id: number } | null };

    const options: PersistOptions<State, string | null> = {
      key: "token",
      select: (state) => state.token,
      merge: (state, token) => ({ ...state, token }),
    };

    expectTypeOf(options.select!).returns.toEqualTypeOf<string | null>();

    const store = createStore<State>({ token: null, user: null }).extend(
      withStorage(createMemoryStorageAdapter(), options),
    );

    expectTypeOf(store.persist).toEqualTypeOf<PersistController<State, string | null>>();
  });
});
