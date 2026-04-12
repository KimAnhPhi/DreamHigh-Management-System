-- AlterTable: optional password for Google-only users; Google account link
ALTER TABLE "system_users" ALTER COLUMN "password_hash" DROP NOT NULL;

ALTER TABLE "system_users" ADD COLUMN "google_sub" VARCHAR(255);

CREATE UNIQUE INDEX "system_users_google_sub_key" ON "system_users"("google_sub");
