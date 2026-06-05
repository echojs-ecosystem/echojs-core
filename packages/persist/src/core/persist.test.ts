import { describe, expect, it, vi } from "vitest";
import { createStore } from "@echojs-ecosystem/store";

import { createMemoryStorageAdapter } from "../adapters/memory";
import { createPersistRecord } from "./record";
import { jsonSerializer } from "./serializer";
import { withStorage } from "./with-storage";
import { flushMicrotasks, setupMemoryPersist } from "../test-utils";

describe("persist (memory adapter)", () => {
  it("hydrates from empty storage", async () => {
    const { store, adapter, wait } = setupMemoryPersist(0, { key: "counter" });
    await wait();
    expect(store.value()).toBe(0);
    expect(adapter.getItem("counter")).toBeNull();
    expect(store.persist.$hydrated.value()).toBe(true);
  });

  it("hydrates from existing storage", async () => {
    const adapter = createMemoryStorageAdapter();
    const record = createPersistRecord(42, { version: 1 });
    adapter.setItem("counter", jsonSerializer.serialize(record));

    const { store, wait } = setupMemoryPersist(0, { key: "counter" }, adapter);
    await wait();
    expect(store.value()).toBe(42);
  });

  it("saves on target change", async () => {
    const { store, adapter, wait, save } = setupMemoryPersist(0, { key: "counter" });
    await wait();

    store.set(7);
    await save();

    const raw = adapter.getItem("counter");
    expect(raw).not.toBeNull();
    const record = jsonSerializer.deserialize(raw!) as { data: number };
    expect(record.data).toBe(7);
  });

  it("saveInitial false does not write empty storage", async () => {
    const { adapter, wait } = setupMemoryPersist(0, { key: "counter", saveInitial: false });
    await wait();
    expect(adapter.getItem("counter")).toBeNull();
  });

  it("saveInitial true writes initial value", async () => {
    const { adapter, wait } = setupMemoryPersist(5, { key: "counter", saveInitial: true });
    await wait();
    const record = jsonSerializer.deserialize(adapter.getItem("counter")!) as { data: number };
    expect(record.data).toBe(5);
  });
});

describe("debounce (persist integration)", () => {
  it("debounces save", async () => {
    vi.useFakeTimers();

    const { store, adapter, wait } = setupMemoryPersist(0, { key: "counter", debounce: 100 });
    await wait();

    store.set(1);
    store.set(2);
    store.set(3);

    expect(adapter.getItem("counter")).toBeNull();

    await vi.advanceTimersByTimeAsync(100);
    await flushMicrotasks();

    const raw = adapter.getItem("counter");
    expect(raw).not.toBeNull();

    vi.useRealTimers();
  });
});

describe("pause() / resume()", () => {
  it("pause prevents save, resume enables save", async () => {
    const { store, adapter, wait, save } = setupMemoryPersist(0, { key: "counter" });
    await wait();

    store.persist.pause();
    store.set(1);
    await flushMicrotasks();
    expect(adapter.getItem("counter")).toBeNull();

    store.persist.resume();
    store.set(2);
    await save();

    const raw = adapter.getItem("counter");
    expect(raw).not.toBeNull();
  });
});

describe("clear()", () => {
  it("removes item from storage without resetting target", async () => {
    const { store, adapter, wait, save } = setupMemoryPersist(10, { key: "counter", saveInitial: true });
    await wait();

    store.set(20);
    await save();
    expect(adapter.getItem("counter")).not.toBeNull();

    await store.persist.clear();
    expect(adapter.getItem("counter")).toBeNull();
    expect(store.value()).toBe(20);
  });
});

describe("validate", () => {
  it("applies valid data", async () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem("name", jsonSerializer.serialize(createPersistRecord("Vova", { version: 1 })));

    const { store, wait } = setupMemoryPersist(
      "",
      {
        key: "name",
        validate: (data): data is string => typeof data === "string",
      },
      adapter,
    );

    await wait();
    expect(store.value()).toBe("Vova");
  });

  it("ignores invalid data", async () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem("name", jsonSerializer.serialize(createPersistRecord(123, { version: 1 })));

    const { store, wait } = setupMemoryPersist(
      "initial",
      {
        key: "name",
        validate: (data): data is string => typeof data === "string",
      },
      adapter,
    );

    await wait();
    expect(store.value()).toBe("initial");
  });
});

describe("select / merge", () => {
  it("select saves partial state", async () => {
    const { store, adapter, wait, save } = setupMemoryPersist(
      { token: null, user: null },
      {
        key: "token",
        select: (state) => state.token,
        merge: (state, token) => ({ ...state, token }),
      },
    );

    await wait();
    store.set({ token: "abc", user: { id: 1 } });
    await save();

    const record = jsonSerializer.deserialize(adapter.getItem("token")!) as { data: string | null };
    expect(record.data).toBe("abc");
  });

  it("merge restores partial snapshot into current state", async () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem(
      "token",
      jsonSerializer.serialize(createPersistRecord("saved-token", { version: 1 })),
    );

    const { store, wait } = setupMemoryPersist(
      { token: null, user: { id: 1 } },
      {
        key: "token",
        select: (state) => state.token,
        merge: (state, token) => ({ ...state, token }),
      },
      adapter,
    );

    await wait();
    expect(store.value()).toEqual({ token: "saved-token", user: { id: 1 } });
  });
});

describe("migration", () => {
  it("does not migrate when version matches", async () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem(
      "settings",
      jsonSerializer.serialize(createPersistRecord({ theme: "dark" }, { version: 2 })),
    );

    const migrate = vi.fn();
    const { store, wait } = setupMemoryPersist(
      { theme: "light" },
      { key: "settings", version: 2, migrate },
      adapter,
    );
    await wait();

    expect(migrate).not.toHaveBeenCalled();
    expect(store.value()).toEqual({ theme: "dark" });
  });

  it("migrates old version and applies result", async () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem(
      "settings",
      jsonSerializer.serialize(createPersistRecord({ theme: "dark" }, { version: 1 })),
    );

    const { store, wait } = setupMemoryPersist(
      { theme: "light", compact: false },
      {
        key: "settings",
        version: 2,
        migrate: ({ data }) => {
          const old = data as { theme: string };
          return { theme: old.theme, compact: true };
        },
      },
      adapter,
    );

    await wait();
    expect(store.value()).toEqual({ theme: "dark", compact: true });
  });
});

describe("ttl", () => {
  it("expires record on hydrate and removes it", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-01-01T00:00:00Z"));

    const adapter = createMemoryStorageAdapter();
    const record = createPersistRecord("old", { version: 1, ttl: 1000 });
    adapter.setItem("draft", jsonSerializer.serialize(record));

    vi.setSystemTime(new Date("2020-01-01T00:00:10Z"));

    const { store, wait } = setupMemoryPersist("initial", { key: "draft" }, adapter);
    await wait();

    expect(store.value()).toBe("initial");
    expect(adapter.getItem("draft")).toBeNull();

    vi.useRealTimers();
  });

  it("stores expiresAt when ttl is set", async () => {
    const { store, adapter, wait } = setupMemoryPersist(1, { key: "counter", ttl: 5000, saveInitial: true });
    await wait();

    const record = jsonSerializer.deserialize(adapter.getItem("counter")!) as {
      expiresAt?: number;
    };
    expect(record.expiresAt).toBeTypeOf("number");
    expect(store.value()).toBe(1);
  });
});

describe("$error and $pending", () => {
  it("writes error to $error on invalid persisted JSON", async () => {
    const adapter = createMemoryStorageAdapter();
    adapter.setItem("broken", "{not-json");

    const store = createStore(0).extend(
      withStorage(adapter, {
        key: "broken",
        hydrate: false,
        serializer: jsonSerializer as never,
      }),
    );

    await store.persist.hydrate();
    expect(store.persist.$error.value()).not.toBeNull();
  });
});

describe("@echojs-ecosystem/store integration", () => {
  it("works with createStore().extend(withMemoryStorage())", async () => {
    const adapter = createMemoryStorageAdapter();

    const theme = createStore("dark", { name: "theme" }).extend(
      withStorage(adapter, {
        key: "app-theme",
        hydrate: false,
      }),
    );

    await theme.persist.hydrate();
    theme.set("light");
    await theme.persist.save();
    await flushMicrotasks();

    const theme2 = createStore("dark").extend(
      withStorage(adapter, {
        key: "app-theme",
        hydrate: false,
      }),
    );
    await theme2.persist.hydrate();

    expect(theme2.value()).toBe("light");
  });

  it("supports manual hydrate", async () => {
    const draft = createStore("").extend(
      withStorage(createMemoryStorageAdapter(), {
        key: "draft",
        hydrate: false,
      }),
    );

    expect(draft.persist.$hydrated.value()).toBe(false);
    await draft.persist.hydrate();
    expect(draft.persist.$hydrated.value()).toBe(true);
  });
});
