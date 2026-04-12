-- Story 1.3: IAM — username, phone (đăng nhập vẫn dùng email; username định danh hiển thị)
ALTER TABLE "system_users" ADD COLUMN "username" VARCHAR(100);
ALTER TABLE "system_users" ADD COLUMN "phone" VARCHAR(50);

UPDATE "system_users" SET "username" = 'u' || id::text WHERE "username" IS NULL;

ALTER TABLE "system_users" ALTER COLUMN "username" SET NOT NULL;

CREATE UNIQUE INDEX "system_users_username_key" ON "system_users"("username");
