import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
// import * as schema from '../db/schema.ts'
import ws from 'ws'



const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql)
