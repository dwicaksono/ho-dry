import { Hono } from "hono";
import { db } from "../db/index";
import { laundryItems } from "../db/schema";
import { CreateLaundrySchema, UpdateStatusSchema } from "../types/schemas/laundry";
import { validate } from "../lib/validator";
import { eq } from "drizzle-orm";

const router = new Hono();

router.get("/", async (c) => {
  const status = c.req.query("status");
  const limit = Number(c.req.query("limit") || 20);
  
  const rows = await db
    .select()
    .from(laundryItems)
    .where(status ? eq(laundryItems.status, status) : undefined)
    .limit(limit);
  
  return c.json(rows);
});

router.post("/", validate(CreateLaundrySchema), async (c) => {
  const body = await c.req.json();
  const parsed = CreateLaundrySchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.format() }, 400);

  const inserted = await db.insert(laundryItems).values({
    ward: parsed.data.ward,
    item_type: parsed.data.item_type,
    quantity: parsed.data.quantity,
    notes: parsed.data.notes ?? "",
  }).returning();

  // optionally emit socket event here (if integrated)
  return c.json(inserted[0], 201);
});

router.patch("/:id/status", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const parsed = UpdateStatusSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.format() }, 400);

  const updated = await db.update(laundryItems).set({ status: parsed.data.status }).where(eq(laundryItems.id, id)).returning();
  if (!updated.length) return c.json({ error: "Not found" }, 404);
  // optional: push update via socket
  return c.json(updated[0]);
});

export default router;
