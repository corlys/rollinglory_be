ALTER TABLE "gifts" ALTER COLUMN "stock" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "gifts" ALTER COLUMN "stock" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "gifts" ALTER COLUMN "rating" SET DEFAULT 0;