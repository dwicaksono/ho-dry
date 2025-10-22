import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.string().optional(),
    // JWT_SECRET: z.string().min(32, "JWT_SECRET should be at least 32 characters"),
    JWT_SECRET: z.string().optional(),
    NODE_ENV: z.string().optional(),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error("Invalid environment variables:", _env.error.format());
    throw new Error("Invalid environment variables");
}
export const env = {
    DATABASE_URL: _env.data.DATABASE_URL,
    PORT: Number(_env.data.PORT ?? 3001),
    JWT_SECRET: _env.data.JWT_SECRET ?? "",
    NODE_ENV: _env.data.NODE_ENV ?? "development",
};
