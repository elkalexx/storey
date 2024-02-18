CREATE TABLE IF NOT EXISTS "speedy_offices" (
	"id" serial PRIMARY KEY NOT NULL,
	"office_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"name_en" varchar NOT NULL,
	"city" varchar NOT NULL,
	"address" varchar NOT NULL
);
