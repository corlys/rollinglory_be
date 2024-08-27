CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"salted_password" text NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
