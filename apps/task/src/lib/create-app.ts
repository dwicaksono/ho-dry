import { OpenAPIHono } from "@hono/zod-openapi";
import { pinoLogger } from "hono-pino";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import type { AppBindings } from "./types";

export function createRouter() {
  const route = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });

  return route;
}

export function createApp() {
  const app = createRouter();

  app.use(serveEmojiFavicon("📃"));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
