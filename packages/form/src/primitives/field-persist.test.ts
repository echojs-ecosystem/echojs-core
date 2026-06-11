import { describe, expect, it } from "vitest";
import { withMemoryStorage } from "@echojs-ecosystem/persist";
import { createField } from "./field";
import { createFieldArray } from "./field-array";

const flushMicrotasks = async (): Promise<void> => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("createField().extend()", () => {
  it("persists value via withMemoryStorage", async () => {
    const email = createField("").extend(
      withMemoryStorage({ key: "form:email", hydrate: false }),
    );

    await email.persist.hydrate();
    email.set("demo@echojs.dev");
    await email.persist.save();
    await flushMicrotasks();

    expect(email.value()).toBe("demo@echojs.dev");
    expect(email.persist.$hydrated.value()).toBe(true);
  });
});

describe("createFieldArray().extend()", () => {
  it("persists items via withMemoryStorage", async () => {
    const phones = createFieldArray<string>([]).extend(
      withMemoryStorage({ key: "form:phones", hydrate: false }),
    );

    await phones.persist.hydrate();
    phones.replace(["+1"]);
    await phones.persist.save();
    await flushMicrotasks();

    expect(phones.value()).toEqual(["+1"]);
  });
});
