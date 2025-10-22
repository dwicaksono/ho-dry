import { Hono } from "hono";
import { db } from "../db/index";
import { users } from "../db/schema";
import { hash, compare } from "bcrypt";
import { z } from "zod";
import { signJwt } from "../lib/jwt";
const router = new Hono();
const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});
const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
router.post("/register", async (c) => {
    const body = await c.req.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success)
        return c.json({ error: parsed.error.format() }, 400);
    const existing = await db.select().from(users).where(users.email.eq(parsed.data.email)).limit(1);
    if (existing.length)
        return c.json({ error: "Email already used" }, 409);
    const passwordHash = await hash(parsed.data.password, 10);
    const inserted = await db.insert(users).values({
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
    }).returning();
    const user = inserted[0];
    const token = signJwt({ sub: user.id, email: user.email, role: user.role });
    return c.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token }, 201);
});
router.post("/login", async (c) => {
    const body = await c.req.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success)
        return c.json({ error: parsed.error.format() }, 400);
    const found = await db.select().from(users).where(users.email.eq(parsed.data.email)).limit(1);
    if (!found.length)
        return c.json({ error: "Invalid credentials" }, 401);
    const user = found[0];
    const ok = await compare(parsed.data.password, user.passwordHash);
    if (!ok)
        return c.json({ error: "Invalid credentials" }, 401);
    const token = signJwt({ sub: user.id, email: user.email, role: user.role });
    return c.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
});
export default router;
