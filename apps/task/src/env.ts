import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

export const EnvSchema = z.object({
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "fatal", "trace", "debug"]).default("info"),
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type Env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports
let env: Env;

try {
  // eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env);
}
catch (e) {
  const error = e as z.ZodError;

  console.error("❎ Invalid environment variables:", z.treeifyError(error));
  process.exit(1);
}

export default env;
