import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { arrayGenerator, createField, createFieldArray } from "../index";
import { createFieldSet } from "./field-set";
import { createForm } from "./create-form";

describe("createForm()", () => {
  it("задаёт displayName из opts.name", () => {
    const form = createForm({ title: createField("") }, { name: "NamedForm" });
    expect(form.displayName).toBe("NamedForm");
  });

  it("blocks submit when validation has errors", async () => {
    const title = createField("");
    const form = createForm(
      { title },
      {
        name: "SubmitBlockedForm",
        validate: (fields) => ({
          title: !fields.title.$value.value().trim() ? ["required"] : [],
        }),
      },
    );

    const handler = vi.fn();
    const res = await form.submit(handler);
    expect(res.ok).toBe(false);
    expect(handler).not.toHaveBeenCalled();
  });

  it("submits when no errors", async () => {
    const title = createField("ok");
    const form = createForm(
      { title },
      {
        name: "SubmitOkForm",
        validate: (fields) => ({
          title: !fields.title.$value.value().trim() ? ["required"] : [],
        }),
      },
    );

    const handler = vi.fn();
    const res = await form.submit(handler);
    expect(res.ok).toBe(true);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("runs nested validates + Standard Schema submit validation", async () => {
    const profile = createFieldSet({
      email: createField(""),
    });

    const form = createForm(
      { profile },
      {
        name: "NestedSchemaForm",
        schema: z.object({
          profile: z.object({
            email: z.string().email(),
          }),
        }),
      },
    );

    const handler = vi.fn();

    const bad = await form.submit(handler);
    expect(bad.ok).toBe(false);
    expect(handler).not.toHaveBeenCalled();

    form.fields.profile.fields.email.set("hello@world.test");
    const ok = await form.submit(handler);
    expect(ok.ok).toBe(true);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("validationSchema alias works like schema", async () => {
    const email = createField("not-an-email");
    const form = createForm(
      { email },
      { name: "ValidationSchemaAliasForm", validationSchema: z.object({ email: z.string().email() }) },
    );

    const bad = await form.submit(vi.fn());
    expect(bad.ok).toBe(false);

    form.fields.email.set("ok@example.com");
    const ok = await form.submit(vi.fn());
    expect(ok.ok).toBe(true);
  });

  it("submit attaches schema issues under $schema (in addition to field tree)", async () => {
    const email = createField("x");

    const form = createForm(
      { email },
      {
        name: "SchemaErrorsForm",
        schema: z.object({
          email: z.string().email(),
        }),
      },
    );

    const res = await form.submit(vi.fn());
    expect(res.ok).toBe(false);
    if (!res.ok) {
      const schemaBag = res.errors.$schema as Record<string, string[]> | undefined;
      expect(schemaBag?.email?.length).toBeGreaterThan(0);
    }
  });

  it("uses explicit getValue when provided (override auto snapshot)", async () => {
    const a = createField("inner");
    const form = createForm<{ label: string }, { box: { a: typeof a } }>(
      { box: { a } },
      {
        name: "GetValueOverrideForm",
        getValue: () => ({ label: "mapped" }),
      },
    );

    const res = await form.submit((v) => {
      expect(v).toEqual({ label: "mapped" });
    });
    expect(res.ok).toBe(true);
  });

  it("reset вызывает deepReset по дереву полей", () => {
    const title = createField("a");
    const form = createForm({ title }, { name: "ResetForm" });
    title.set("b");
    form.reset();
    expect(title.$value.value()).toBe("a");
  });

  it("submit: ошибка в handler попадает в errors.submit", async () => {
    const title = createField("ok");
    const form = createForm({ title }, { name: "ResetForm" });
    const res = await form.submit(() => {
      throw new Error("boom");
    });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.errors.submit).toBeInstanceOf(Error);
  });

  it("кастомный validate в опциях формы", () => {
    const title = createField("");
    const form = createForm({ title }, {
      name: "CustomValidateForm",
      validate: () => ({ title: ["custom"] }),
    });
    expect(form.validate()).toEqual({ title: ["custom"] });
  });
});

describe("arrayActions + arrayGenerator", () => {
  it("append/remove по вложенным FieldArray", () => {
    type Item = { label: ReturnType<typeof createField<string>> };

    const form = createForm(
      {
        items: createFieldArray<Item>([{ label: createField("a") }]),
      },
      {
        name: "ArrayActionsForm",
        arrayActions: (f) => {
          const createItem = (): Item => ({ label: createField("") });
          return {
            createItem,
            appendItem: arrayGenerator.append(f, createItem, "items"),
            removeItem: arrayGenerator.remove(f, "items"),
          };
        },
      },
    );

    expect(form.fields.items.$items.value()).toHaveLength(1);
    form.arrayActions.appendItem();
    expect(form.fields.items.$items.value()).toHaveLength(2);
    form.arrayActions.removeItem(1);
    expect(form.fields.items.$items.value()).toHaveLength(1);
  });
});