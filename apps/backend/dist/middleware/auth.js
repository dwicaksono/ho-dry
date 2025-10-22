import { verifyJwt } from "../lib/jwt";
export async function requireAuth(c, next) {
    const authHeader = c.req.header("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match)
        return c.text("Unauthorized", 401);
    const token = match[1];
    const payload = verifyJwt(token);
    if (!payload)
        return c.text("Unauthorized", 401);
    // attach user payload to context for route handlers
    c.env = { user: payload };
    await next();
}
