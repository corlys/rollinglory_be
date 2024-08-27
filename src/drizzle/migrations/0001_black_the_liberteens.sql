ALTER TABLE "gifts" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "gifts" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;