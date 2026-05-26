import { describe, expect, it, vi } from "vitest";
import { createPersistRecord } from "../src/core/record.js";
import { jsonSerializer } from "../src/core/serializer.js";
import { createMemoryStorageAdapter } from "../src/adapters/memory.js";
import { setupMemoryPersist } from "./helpers/setup-memory-persist.js";

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
