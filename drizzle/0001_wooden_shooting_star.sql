CREATE TABLE IF NOT EXISTS "cart" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"items_count" integer NOT NULL,
	"items_qty" integer NOT NULL,
	"grand_total" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"cart_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"sku" varchar NOT NULL,
	"name" varchar NOT NULL,
	"qty" integer NOT NULL,
	"price" numeric NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
