import type { Config } from "drizzle-kit";

export default {
  driver: "d1",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
} satisfies Config;
