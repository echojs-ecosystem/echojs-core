import { describe, expect, it } from "vitest";

import { createMemoryStorageAdapter } from "../adapters/memory";
import type { FieldLike } from "../core/types";
import { withStorage } from "../core/with-storage";
import { withMemoryStorage } from "../extensions/with-memory-storage";
import {
  createFakeField,
  createFakeFieldArray,
  createFakeForm,
  flushMicrotasks,
} from "../test-utils";
import { persist, persistField, persistFieldArray } from "./persist-target";

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

  it("persists via persist() without extend method", async () => {
    let value = "";
    const listeners = new Set<(value: string, prevValue: string) => void>();
    const field: FieldLike<string> = {
      kind: "field",
      value: () => value,
      set(next) {
        const prev = value;
        value = next;
        for (const listener of listeners) {
          listener(next, prev);
        }
      },
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
    };

    persist(field, withMemoryStorage({ key: "plain-field", hydrate: false }));
    await field.persist.hydrate();

    field.set("plain");
    await field.persist.save();
    await flushMicrotasks();
    expect(field.value()).toBe("plain");
  });

  it("persistField attaches persist controller", async () => {
    const field = createFakeField("");
    persistField(field, withMemoryStorage({ key: "field-alias", hydrate: false }));
    await field.persist.hydrate();

    field.set("via-alias");
    await field.persist.save();
    await flushMicrotasks();
    expect(field.value()).toBe("via-alias");
  });
});

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

  it("persistFieldArray attaches persist controller", async () => {
    const adapter = createMemoryStorageAdapter();
    const phones = createFakeFieldArray<string>([]);

    persistFieldArray(
      phones,
      withStorage(adapter, {
        key: "form:phones-alias",
        hydrate: false,
      }),
    );

    await phones.persist.hydrate();
    phones.push("+3");
    await phones.persist.save();
    await flushMicrotasks();

    expect(phones.value()).toEqual(["+3"]);
  });
});

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
