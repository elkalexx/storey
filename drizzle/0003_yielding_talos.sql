ALTER TABLE "speedy_offices" ADD COLUMN "city_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "speedy_offices" DROP COLUMN IF EXISTS "city";