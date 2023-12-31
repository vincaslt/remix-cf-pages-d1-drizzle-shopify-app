import type { AppLoadContext } from "@remix-run/cloudflare";
import { drizzle } from "drizzle-orm/d1";

export function initDB(context: AppLoadContext) {
  return drizzle(context.env.DB);
}

export * as schema from "../drizzle/schema";
