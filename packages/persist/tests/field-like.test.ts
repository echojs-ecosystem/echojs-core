import { describe, expect, it } from "vitest";
import { withMemoryStorage } from "../src/extensions/with-memory-storage.js";
import { persist } from "../src/helpers/persist-target.js";
import { createFakeField } from "./helpers/fake-targets.js";
import { flushMicrotasks } from "./helpers/fake-targets.js";

describe("FieldLike target", () => {
  it("persists via extend", async () => {
    const field = createFakeField("").extend(
      withMemoryStorage({
        key: "draft:name",
        hydrate: false,
      }),
    );

    await field.persist.hydrate();
    field.set("Vova");
    await field.persist.save();
    await flushMicrotasks();

    expect(field.value()).toBe("Vova");
    expect(field.persist.$hydrated.value()).toBe(true);
  });

  it("persists via persist() helper", async () => {
    const field = createFakeField("");
    persist(field, withMemoryStorage({ key: "draft:name", hydrate: false }));
    await field.persist.hydrate();

    field.set("Petr");
    await field.persist.save();
    await flushMicrotasks();
    expect(field.value()).toBe("Petr");
  });
});
