import { describe, expect, it } from "vitest";
import { createMemoryStorageAdapter } from "../src/adapters/memory.js";
import { withStorage } from "../src/core/with-storage.js";
import { createFakeForm, flushMicrotasks } from "./helpers/fake-targets.js";

describe("PersistableForm target", () => {
  it("persists whole form value", async () => {
    const adapter = createMemoryStorageAdapter();

    const profileForm = createFakeForm({
      name: "",
      email: "",
      phones: [] as string[],
    }).extend(
      withStorage(adapter, {
        key: "profile-form",
        hydrate: false,
      }),
    );

    await profileForm.persist.hydrate();
    profileForm.set({
      name: "Vova",
      email: "vova@example.com",
      phones: ["+1"],
    });
    await profileForm.persist.save();
    await flushMicrotasks();

    const restored = createFakeForm({
      name: "",
      email: "",
      phones: [] as string[],
    }).extend(
      withStorage(adapter, {
        key: "profile-form",
        hydrate: false,
      }),
    );
    await restored.persist.hydrate();

    expect(restored.value()).toEqual({
      name: "Vova",
      email: "vova@example.com",
      phones: ["+1"],
    });
  });
});
