import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 30 }).default("staff"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const laundryItems = pgTable("laundry_items", {
  id: serial("id").primaryKey(),
  ward: varchar("ward", { length: 100 }).notNull(),
  item_type: varchar("item_type", { length: 100 }).notNull(),
  quantity: integer("quantity").notNull(),
  status: varchar("status", { length: 30 }).default("pending"),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});
