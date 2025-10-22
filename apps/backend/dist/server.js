import app from "./app";
import { serve } from "@hono/node-server";
import { env } from "./lib/env";
const port = env.PORT;
console.log(`🚀 Backend running at http://localhost:${port}`);
serve({ fetch: app.fetch, port });
