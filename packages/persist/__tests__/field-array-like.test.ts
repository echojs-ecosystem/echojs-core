import { describe, expect, it } from "vitest";
import { createMemoryStorageAdapter } from "../src/adapters/memory";
import { withStorage } from "../src/core/with-storage";
import { createFakeFieldArray, flushMicrotasks } from "./helpers/fake-targets";

describe("FieldArrayLike target", () => {
  it("persists array value", async () => {
    const adapter = createMemoryStorageAdapter();

    const phones = createFakeFieldArray<string>([], { name: "phones" }).extend(
      withStorage(adapter, {
        key: "form:phones",
        hydrate: false,
      }),
    );

    await phones.persist.hydrate();
    phones.push("+1");
    phones.push("+2");
    await phones.persist.save();
    await flushMicrotasks();

    expect(phones.value()).toEqual(["+1", "+2"]);
  });
});
