CREATE TABLE IF NOT EXISTS "gifts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"stock" integer NOT NULL,
	"rating" integer
);
