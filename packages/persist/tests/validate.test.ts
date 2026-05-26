import { describe, expect, it } from "vitest";
import { createPersistRecord } from "../src/core/record.js";
import { jsonSerializer } from "../src/core/serializer.js";
import { createMemoryStorageAdapter } from "../src/adapters/memory.js";
import { setupMemoryPersist } from "./helpers/setup-memory-persist.js";

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
