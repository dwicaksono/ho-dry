import { Hono } from "hono";
import { db } from "../db/index";
import { laundryItems } from "../db/schema";
import { CreateLaundrySchema, UpdateStatusSchema } from "@ho-dry/schemas";
const router = new Hono();
router.get("/", async (c) => {
    // optional query params: status, limit
    const status = c.req.query("status");
    const limit = Number(c.req.query("limit") || 20);
    let q = db.select().from(laundryItems).limit(limit);
    if (status)
        q = q.where(laundryItems.status.eq(status));
    const rows = await q;
    return c.json(rows);
});
router.post("/", async (c) => {
    const body = await c.req.json();
    const parsed = CreateLaundrySchema.safeParse(body);
    if (!parsed.success)
        return c.json({ error: parsed.error.format() }, 400);
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
    if (!parsed.success)
        return c.json({ error: parsed.error.format() }, 400);
    const updated = await db.update(laundryItems).set({ status: parsed.data.status }).where(laundryItems.id.eq(id)).returning();
    if (!updated.length)
        return c.json({ error: "Not found" }, 404);
    // optional: push update via socket
    return c.json(updated[0]);
});
export default router;
