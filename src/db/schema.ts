import {decimal, pgTable, serial, uuid, varchar} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial('id').notNull().primaryKey(),
    uuid: uuid("uuid"),
    name: varchar("name").notNull(),
    price: decimal("price").notNull(),
})

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferSelect