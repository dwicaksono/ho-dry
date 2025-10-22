CREATE TABLE "laundry_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"ward" varchar(100) NOT NULL,
	"item_type" varchar(100) NOT NULL,
	"quantity" integer NOT NULL,
	"status" varchar(30) DEFAULT 'pending',
	"notes" text DEFAULT '',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(200) NOT NULL,
	"password_hash" text NOT NULL,
	"role" varchar(30) DEFAULT 'staff',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
