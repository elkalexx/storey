import {
    doublePrecision,
    integer,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const products = pgTable("products", {
    id: serial("id").notNull().primaryKey(),
    uuid: uuid("uuid"),
    name: varchar("name").notNull(),
    price: doublePrecision("price").notNull(),
    sku: varchar("sku").notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const cart = pgTable("cart", {
    id: serial("id").notNull().primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    itemsCount: integer("items_count").notNull(),
    itemsQty: integer("items_qty").notNull(),
    grandTotal: doublePrecision("grand_total").notNull(),
});

export type Cart = typeof cart.$inferSelect;
export type NewCart = typeof cart.$inferInsert;
export const cartItem = pgTable("cart_item", {
    id: serial("id").notNull().primaryKey(),
    cartId: integer("cart_id")
        .notNull()
        .references(() => cart.id, {onDelete: 'cascade'}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    sku: varchar("sku").notNull(),
    name: varchar("name").notNull(),
    qty: integer("qty").notNull(),
    price: doublePrecision("price").notNull(),
});

export type CartItem = typeof cart.$inferSelect;
export type NewCartItem = typeof cart.$inferInsert;

export const speedyOffices = pgTable("speedy_offices", {
    id: serial("id").notNull().primaryKey(),
    officeId: integer("office_id").notNull(),
    cityId: integer("city_id").notNull(),
    name: varchar("name").notNull(),
    nameEn: varchar("name_en").notNull(),
    address: varchar("address").notNull(),
});

export type SpeedyOffice = typeof speedyOffices.$inferSelect;
export type NewSpeedyOffice = typeof speedyOffices.$inferInsert;