import { describe, expect, it } from "vitest";
import { z } from "zod";
import { createField } from "../src/primitives/field";
import { createFieldArray } from "../src/primitives/fieldArray";
import { createFieldKit } from "../src/primitives/field-kit";
import { createForm } from "../src/primitives/form";

describe("createFieldKit()", () => {
  it("reads primitives and nested lists from seed", () => {
    const Role = z.enum(["a", "b"]);
    const seed = {
      title: "T",
      n: 3,
      on: true,
      role: "b",
      rows: [{ code: "x" }, { code: "y" }],
    };
    const f = createFieldKit(seed);

    expect(f.str("title", z.string(), seed).$value.value()).toBe("T");
    expect(f.num("n", z.number(), seed).$value.value()).toBe(3);
    expect(f.bool("on", z.boolean(), seed).$value.value()).toBe(true);
    expect(f.pick("role", Role, seed, "a").$value.value()).toBe("b");

    const arr = f.list("rows", (row) => ({ code: f.str("code", z.string(), row) }), seed);
    const items = arr.$items.value();
    expect(items).toHaveLength(2);
    expect(items[0]!.code.$value.value()).toBe("x");
    expect(items[1]!.code.$value.value()).toBe("y");
  });

  it("createForm(fields, opts) hydrates defaultValues into prebuilt fields", async () => {
    const schema = z.object({
      name: z.string().min(1),
      tags: z.array(z.object({ t: z.string().min(1) })),
    });
    type V = z.infer<typeof schema>;
    type Row = { t: ReturnType<typeof createField<string>> };
    type Fields = {
      name: ReturnType<typeof createField<string>>;
      tags: ReturnType<typeof createFieldArray<Row>>;
    };

    const newTagRow = (): Row => ({
      t: createField("", { schema: z.string().min(1) }),
    });

    const form = createForm<V, Fields>(
      {
        name: createField("", { schema: z.string().min(1) }),
        tags: createFieldArray<Row>([]),
      },
      {
        validationSchema: schema,
        defaultValues: { name: "Ada", tags: [{ t: "one" }] },
        fieldArrayFactories: { tags: newTagRow },
      },
    );

    expect(form.fields.name.$value.value()).toBe("Ada");
    expect(form.fields.tags.$items.value()[0]!.t.$value.value()).toBe("one");

    const res = await form.submit(() => {});
    expect(res.ok).toBe(true);
  });
});
