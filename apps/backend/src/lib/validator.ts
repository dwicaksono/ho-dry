import type { z } from 'zod';

export function validate<T extends z.ZodTypeAny>(schema: T) {
  return async (c: any, next: any) => {
    try {
      const body = await c.req.json();
      const parsed = schema.parse(body);
      // attach parsed to context
      (c as any).validated = parsed;
      await next();
    } catch (e: any) {
      return c.json({ error: e?.errors ?? e?.message }, 400);
    }
  };
}
