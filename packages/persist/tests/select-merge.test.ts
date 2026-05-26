import { describe, expect, it } from "vitest";
import { createPersistRecord } from "../src/core/record.js";
import { jsonSerializer } from "../src/core/serializer.js";
import { createMemoryStorageAdapter } from "../src/adapters/memory.js";
import { setupMemoryPersist } from "./helpers/setup-memory-persist.js";

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
