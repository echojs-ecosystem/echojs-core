import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { createField } from "../src/primitives/field";
import { createFieldSet } from "../src/primitives/fieldSet";
import { collectFormValueFromFields } from "../src/primitives/collect-form-value";
import { createForm } from "../src/primitives/form";

describe("collectFormValueFromFields()", () => {
  it("unwraps Field, FieldSet and FieldArray", () => {
    const title = createField("root");
    const profile = createFieldSet({
      email: createField("a@b.c"),
    });
    expect(collectFormValueFromFields({ title, profile })).toEqual({
      title: "root",
      profile: { email: "a@b.c" },
    });
  });
});

describe("createForm()", () => {
  it("blocks submit when validation has errors", async () => {
    const title = createField("", { validate: [(v) => (!v.trim() ? "required" : null)] });
    const form = createForm({ title }, {});

    const handler = vi.fn();
    const res = await form.submit(handler);
    expect(res.ok).toBe(false);
    expect(handler).not.toHaveBeenCalled();
  });

  it("submits when no errors", async () => {
    const title = createField("ok", { validate: [(v) => (!v.trim() ? "required" : null)] });
    const form = createForm({ title }, {});

    const handler = vi.fn();
    const res = await form.submit(handler);
    expect(res.ok).toBe(true);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("runs nested validates + Standard Schema submit validation", async () => {
    const profile = createFieldSet({
      email: createField("", { schema: z.string().email() }),
    });

    const form = createForm(
      { profile },
      {
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
    const email = createField("not-an-email", { schema: z.string().email() });
    const form = createForm(
      { email },
      { validationSchema: z.object({ email: z.string().email() }) },
    );

    const bad = await form.submit(vi.fn());
    expect(bad.ok).toBe(false);

    form.fields.email.set("ok@example.com");
    const ok = await form.submit(vi.fn());
    expect(ok.ok).toBe(true);
  });

  it("submit attaches schema issues under $schema (in addition to field tree)", async () => {
    const email = createField("x", {
      schema: z.string().min(10),
    });

    const form = createForm(
      { email },
      {
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
    const form = createForm<{ label: string }, { box: { a: typeof a } }>({ box: { a } }, {
      getValue: () => ({ label: "mapped" }),
    });

    const res = await form.submit((v) => {
      expect(v).toEqual({ label: "mapped" });
    });
    expect(res.ok).toBe(true);
  });
});

