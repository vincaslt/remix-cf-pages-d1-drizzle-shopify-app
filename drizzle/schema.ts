import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const test_table = sqliteTable("test_table", {
  test_data: text("test_data").notNull(),
});
