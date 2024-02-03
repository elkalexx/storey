CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid,
	"name" varchar NOT NULL,
	"price" numeric NOT NULL
);
