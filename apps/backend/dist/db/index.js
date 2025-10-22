import 'dotenv/config';
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { env } from "../lib/env";
neonConfig.webSocketConstructor = ws;
const sql = neon(env.DATABASE_URL);
export const db = drizzle({ client: sql });
